
## Generative Latent Optimization

   > [*Optimizing the Latent Space of Generative Networks*, P. Bojanowski, A. Joulin, D. Lopez-Paz, A. Szlam](https://arxiv.org/abs/1707.05776)


```python
import os
import sys
import glob
from datetime import datetime

import numpy as np
import scipy.misc
import tensorflow as tf
import tensorflow.contrib.slim as slim

import logging
logging.getLogger("tensorflow").setLevel(logging.WARNING)
```

First, we define the input loading queue which reads images from a given list of filenames and feed them through an optional preprocessing function.

The `get_inputs_queue` function returns a queue whose elements are input dictionnary with keys:
  * `image`: A 4D Tensor of size (BATCH_SIZE, HEIGHT, WIDTH, N_CHANNELS) representing the input images.
  * `index`: A scalar Tensor containing the index of the image in the database


```python
def get_inputs_queue(filenames, 
                     preprocess_inputs=None,
                     batch_size=16,
                     num_threads=1,
                     extension='jpeg', 
                     channels=3,
                     capacity=800,
                     min_after_dequeue=100):
    """Returns a queue containing input images and indices from a files list.
    
    Args:
      filenames: List of image files to read the input from.
      preprocess_inputs: Preprocessing function taking a dictionary as input 
        and outputting a dictionnary with the same keys.
      batch_size: Batch size.
      num_threads: Number of readers for the batch queue.
      extension: Image format.
      channels: Number of image channels.
      capacity: Queue capacity.
      
    Returns: 
      A queue containing the input batches, where each input is a dictionnary
      of Tensors.
    """
    inputs = {}
    # Read index
    index_queue = tf.train.range_input_producer(
        len(filenames), capacity=capacity, shuffle=False)
    inputs['index'] = index_queue.dequeue()
    
    # Read Image
    filename_queue = tf.train.string_input_producer(
        filenames, capacity=capacity, shuffle=False)
    _, reader = tf.WholeFileReader().read(filename_queue)
    if extension in ['jpg', 'jpeg']:
        image = tf.image.decode_jpeg(reader, channels=channels, name='decoder')
    else:
        print('%s unimplemented' % extension)
    inputs['image'] = image
        
    # Preprocess the inputs
    if preprocess_inputs is not None:
        with tf.variable_scope('inputs_preprocess'):
            inputs = preprocess_inputs(inputs)
    
    # Batch the inputs 
    inputs = tf.train.shuffle_batch(inputs, batch_size, capacity, 
                                    min_after_dequeue,
                                    num_threads=num_threads, 
                                    name='inputs_batches_queue')
    return inputs   

def preprocess_inputs(inputs, tight_crop=False, size=256):
    """Preprocess input images to map them to [0, 1] and square-resize them.
    
    Args:
      inputs: A dictionnary of Tensors.
      tight_crop: If True, further crops the face input.
      size: The square size to resize image to.
      
    Returns:
      The preprocessed dictionnary of inputs with normalized images.
    """
    # Map to [-1, 1]
    with tf.control_dependencies([tf.assert_type(inputs['image'], tf.uint8)]):
        inputs['image'] = tf.image.convert_image_dtype(
            inputs['image'], tf.float32)
        inputs['image'] = (inputs['image'] - 0.5) * 2
        
    # Central crop to minimal side
    height = tf.shape(inputs['image'])[0]
    width = tf.shape(inputs['image'])[1]
    min_side = tf.minimum(height, width)
    min_side = 108 if tight_crop else tf.minimum(height, width)
    offset_height = (height - min_side) // 2
    offset_width = (width - min_side) // 2
    inputs['image'] = tf.image.crop_to_bounding_box(
        inputs['image'], offset_height, offset_width, min_side, min_side)
    
    # Resize
    if size is not None and size > 0:
        inputs['image'] = tf.image.resize_images(inputs['image'], (size, size))
    
    return inputs
```

#### Encoder

There's no encoder in GLO. We directly learn the code $z_i$ for each input training image $x_i$. Additionally, the code space is constrained by projecting each code to the unit ball before feeding them to the decoder.
  
#### Decoder

  * *Inputs*: (batch**x**num_latent_dims)
  * 1 deconvolution upscale the input to (batch**x**4**x**4**x**c)
  * 5 deconvolutional blocks
    * transpose convolution, stride 2, kernel size 3
    * ReLU activation and Batch normalization
  * *Outputs*: (batch**x**128**x**128**x**3)


```python
def project(z, as_numpy=False):
    """Project the input vector to the unit ball."""
    if as_numpy:
        return z / np.sqrt(np.sum(z ** 2, axis=1))[:, np.newaxis]
    else:
        return z / tf.sqrt(tf.reduce_sum(z ** 2, axis=1, keep_dims=True))
    
def decoder(latent_z, 
            num_filters,
            kernel_size=5,
            activation_fn=tf.nn.relu, 
            normalizer_fn=slim.batch_norm,
            normalizer_decay=0.99,
            is_training=True, 
            reuse=False):
    """ Simple convolutional decoder with deconvolutions and ReLU.
    
    Args:
      latent_z: 2D Tensor representing the latent variable.
      num_filters: Number of filters for each convolutional block.
      activation_fn: Activation function. Defaults to elu.
      normalizer_fn: Normalization function. Defaults to Batch norm. Set to
          None for no normalization.
      normalizer_decay: Decay for the normalization.
      is_training: Whether the model is in training mode.
      reuse: Whether to reuse the variables or not.
      
    Returns:
      A 4D Tensor representing the output images
      
    """
    # Config
    weights_initializer = tf.contrib.layers.xavier_initializer()
    normalizer_params = {'is_training': is_training, 'decay': normalizer_decay, 'scale':True}
    
    # Network
    with tf.variable_scope('decoder', reuse=reuse):
        with slim.arg_scope([slim.conv2d_transpose], stride=2,
                            weights_initializer=weights_initializer,
                            activation_fn=activation_fn,
                            normalizer_fn=normalizer_fn,
                            normalizer_params=normalizer_params,
                            padding='SAME'):
            # Flattened input -> 4 x 4 patch
            shape = latent_z.get_shape().as_list()
            net = tf.reshape(latent_z, (shape[0], 1, 1, shape[1]))
            net = slim.conv2d_transpose(net, num_filters[0], [4, 4],
                                        stride=1,
                                        padding='VALID', 
                                        scope='deconv1')
            # Upscale via deconvolutions
            for i, num_filter in enumerate(num_filters[1:]):
                net = slim.conv2d_transpose(net, num_filter, [kernel_size, kernel_size],
                                            scope='deconv%d' % (i + 2))
            
            # Final deconvolution
            net = slim.conv2d_transpose(net, 3, [3, 3], 
                                        stride=2,
                                        activation_fn=tf.nn.tanh,
                                        normalizer_fn=None,
                                        scope='deconv_out')
            return net    
        
def get_glo_loss(images, reconstructions, weight=1.0):
    """Returns the GLO loss
    
    Args:
        images: Input images
        reconstructions: Generated reconstructions
    """
    return weight * tf.reduce_mean(tf.square(images - reconstructions))
```

Finally, we define some utilitary function for Tensorboard summaries


```python
#################
# SUMMARY UTILS #
#################

def image_grid(images, num_rows=4, crop=True):
    """Stack images into a square grid with the given number of rows.
    
    Args:
      images: 4D Tensor of images.
      num_rows: Number of rows in the grid.
    """
    if crop: 
        images = images[:num_rows*num_rows]
    images = images * 0.5 + 0.5
    images = tf.unstack(images, axis=0) 
    images = tf.concat(images, axis=1) 
    images = tf.split(images, num_rows, axis=1) 
    images = tf.concat(images, axis=0) 
    return tf.expand_dims(images, 0)

def comparison_image_grid(images, reconstructions, side=4):
    """Stack images into a square grid arranged for column-wise comparison.
    
    Args:
      images: 4D Tensor of images.
      reconstructions: Another 4D Tensor of images.
      side: Number of rows in the output grid (number of columns will be twice
        that amount).
    """
    out = tf.concat([images[:side * side, ...], 
                     reconstructions[:side * side, ...]], 1)
    width = images.get_shape()[2].value
    out = tf.reshape(out, (2 * side * side, -1, width, 3))
    out = image_grid(out, num_rows=side, crop=False)
    return out

def add_glo_summaries(inputs, outputs, num_rows=4, key='glo'):
    """Additional GLO summaries."""    
    outputs['reconstruction_grid'] = comparison_image_grid(
            inputs['image'], outputs['reconstruction'], side=num_rows)
    tf.summary.image('reconstruction', outputs['reconstruction_grid'], collections=[key])
    
    outputs['sampled_unit_grid'] = image_grid(outputs['sampled_unit'], num_rows=num_rows)
    tf.summary.image('sampled_unit', outputs['sampled_unit_grid'], collections=[key], family='samples')
    
    outputs['sampled_fitted_grid'] = image_grid(outputs['sampled_fitted'], num_rows=num_rows)
    tf.summary.image('sampled_fitted', outputs['sampled_fitted_grid'], collections=[key], family='samples')
    
    outputs['interpolated_grid'] = image_grid(outputs['interpolated'], num_rows=num_rows)
    tf.summary.image('interpolated', outputs['interpolated_grid'], collections=[key], family='samples')

def add_glo_config_summary(key='config'):
    """Add a text summary containing the configuration for the VAE model."""
    allowed_keys = ['BATCH_SIZE', 'SIZE', 'NUM_DIMS', 'BASE_DIR',
                    'NUM_DECODER_FILTERS', 'LEARNING_RATE', 'NUM_STEPS']
    global_variables = globals()
    summary_str = tf.convert_to_tensor('###Configuration \n\t' + 
                                       '\n\t'.join(['%s = %s' % (key, global_variables[key]) 
                                                  for key in allowed_keys]))
    tf.summary.text('config', summary_str, collections=[key])
```

We're now ready for training. We first define hyperparameters for the model.
During training, the latent codes are directly optimized and are stored as trainable `Tensorflow` variables that can be retrieved by slicing with the corresponding index. Due to the large size of the dataset, the model requires a few epochs before displaying interesting results / starting to learn correct codes.


```python
# GPU
NUM_GPUS = 1                                                   # Number og GPUs to use
GPU_MEM_FRAC = 0.5                                             # Memory Fraction to use per GPU
os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]="2"
# Inputs 
BASE_DIR = '/home/aroyer/Datasets/Celeba/Img/img_align_celeba' # Base image directory
EXTENSION = 'jpg'                                              # Extension of the images to load
TIGHT_CROP = False
BATCH_SIZE = 32                                                # Batch size
NUM_ROWS = 5                                                   # Number of rows in the image summary
SIZE = 128                                                     # Image square size
NUM_DIMS = 100                                                 # Number of latent dimensions
# Architecture
NUM_DECODER_FILTERS = [256, 128, 64, 64, 32]                   # Number of filters for each decoder conv block
# Hyper parameters 
LEARNING_RATE = 0.001                                          # Learning rate
# Log dir and outputs
BASE_LOG_DIR = 'log'
EXP_NAME = 'celeba_glo_128'                                    # Base name for the experiment
SAVE_SUMMARIES_STEPS = 100                                     # Save summary every given *step*
SAVE_IMAGES_STEPS = 30000                                      # Save output images every given *steps*
SAVE_IMAGES_KEYS = ['reconstruction_grid', 'sampled_unit_grid', 
                    'sampled_fitted_grid', 'interpolated_grid']
SAVE_CHECKPOINT_SECS = 600                                     # Save checkpoint every given *time*
MAX_TO_KEEP = 1                                                # Max number of saved checkpoints to retain
LOG_GLOBALSTEP_STEPS = 100                                     # Log (print) the global step every given step
# (OPT) Number of steps (set to -1 for inifinite run)
NUM_STEPS = -1                                                 
# (OPT) Number of samples to restrict the dataset to (set to -1 for no limit)
NUM_SAMPLES = -1                                               

def get_monitored_training_session():
    """Returns a monitored training session object with the given config."""
    global LOG_DIR, GPU_MEM_FRAC, MAX_TO_KEEP, NUM_STEPS
    global SAVE_CHECKPOINT_SECS, SAVE_SUMMARIES_STEPS, LOG_GLOBALSTEP_STEPS
    # GPU config
    config = tf.ConfigProto(
        gpu_options=tf.GPUOptions(per_process_gpu_memory_fraction=GPU_MEM_FRAC),
        log_device_placement=True,
        allow_soft_placement=True)
    # Checkpoint saving
    if not os.path.exists(os.path.join(LOG_DIR, 'images')):
        os.makedirs(os.path.join(LOG_DIR, 'images'))
    scaffold = tf.train.Scaffold(saver=tf.train.Saver(max_to_keep=MAX_TO_KEEP))
    # Number of iterations
    hooks = ([] if NUM_STEPS <= 0 else
            [tf.train.StopAtStepHook(num_steps=NUM_STEPS)])
    # Summary hooks
    hooks.append(tf.train.SummarySaverHook(
        save_steps=SAVE_SUMMARIES_STEPS,
        output_dir=LOG_DIR,
        summary_op=tf.summary.merge_all(key='glo')))
    hooks.append(tf.train.SummarySaverHook(
        save_steps=120000,
        output_dir=LOG_DIR,
        summary_op=tf.summary.merge_all(key='config')))
    # Session object
    return tf.train.MonitoredTrainingSession(
        checkpoint_dir=LOG_DIR,
        config=config,
        scaffold=scaffold,
        hooks=hooks,
        save_checkpoint_secs=SAVE_CHECKPOINT_SECS,
        log_step_count_steps=LOG_GLOBALSTEP_STEPS)
```


```python
with tf.Graph().as_default():  
    ## Input images
    filenames = glob.glob(os.path.join(BASE_DIR, '*.%s' % EXTENSION))
    if NUM_SAMPLES > 0: filenames = filenames[:NUM_SAMPLES]
    codes = slim.variable('codes', dtype=tf.float32, 
                          shape=(len(filenames), NUM_DIMS),
                          trainable=True)  
    
    ## Training Network
    for i in range(NUM_GPUS):
        # inputs
        with tf.name_scope('inputs_%d' % (i + 1)):
            inputs = get_inputs_queue(filenames,
                                      lambda x: preprocess_inputs(x, tight_crop=TIGHT_CROP, size=SIZE), 
                                      batch_size=BATCH_SIZE,
                                      extension=EXTENSION)
            
        # outputs
        outputs = {}
        with tf.name_scope('model_%d' % i):
            with tf.device('/gpu:%d' % i):
                # retrieve code
                outputs['code'] = tf.gather(codes, inputs['index'])
                # project code
                outputs['code'] = project(outputs['code'])
                # decode
                outputs['reconstruction'] = decoder(
                    outputs['code'],
                    num_filters=NUM_DECODER_FILTERS,
                    reuse=i > 0)
    
        # loss 
        with tf.name_scope('loss_%d' % i):
            loss =  tf.losses.mean_pairwise_squared_error(
                inputs['image'], outputs['reconstruction'])
            tf.add_to_collection('total_loss', loss)
            
    # Optimization
    global_step = tf.contrib.framework.get_or_create_global_step()
    optimizer = tf.train.AdamOptimizer(learning_rate=LEARNING_RATE)
    loss = tf.add_n(tf.get_collection('total_loss')) / NUM_GPUS
    tf.summary.scalar('total', loss, family='losses')
    train_op = optimizer.minimize(loss, global_step=global_step, 
                                  colocate_gradients_with_ops=True)
    
    # Update op for batch norm
    update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS) 
    train_op = tf.group(train_op, *update_ops)
        
    # Multi:gpu Track the moving averages of all trainable variables.
    if NUM_GPUS > 1:
        variable_averages = tf.train.ExponentialMovingAverage(0.9995, global_step)
        variables_averages_op = variable_averages.apply(tf.trainable_variables())
        # Group all updates to into a single train op.
        train_op = tf.group(train_op, variables_averages_op)
    
    ## Inference Network
    with tf.name_scope('sampled_unit'):
        sampled_z = tf.random_normal((BATCH_SIZE, NUM_DIMS))
        sampled_z = project(sampled_z)
        outputs['sampled_unit'] = decoder(sampled_z, 
                                          num_filters=NUM_DECODER_FILTERS,
                                          is_training=False,
                                          reuse=True)    
    with tf.name_scope('sampled_fitted'):
        z_means, z_vars = tf.nn.moments(codes, axes=(0,))
        z_means = tf.expand_dims(z_means, 0)
        z_vars = tf.expand_dims(z_vars, 0)
        sampled_z = tf.random_normal((BATCH_SIZE, NUM_DIMS))
        sampled_z = z_means + sampled_z * tf.sqrt(z_vars) 
        sampled_z = project(sampled_z)
        outputs['sampled_fitted'] = decoder(sampled_z, 
                                            num_filters=NUM_DECODER_FILTERS,
                                            is_training=False,
                                            reuse=True)   
    with tf.name_scope('interpolated'):
        indx = np.random.randint(0, len(filenames), size=2)
        sampled_z_1 = tf.expand_dims(tf.gather(
            codes, tf.random_uniform((), maxval=len(filenames), dtype=tf.int32)), 1)
        sampled_z_2 = tf.expand_dims(tf.gather(
            codes, tf.random_uniform((), maxval=len(filenames), dtype=tf.int32)), 1)
        coeffs = np.linspace(0., 1., NUM_ROWS * NUM_ROWS)
        sampled_z = sampled_z_1 * coeffs + sampled_z_2 * (1 - coeffs)
        sampled_z = tf.transpose(sampled_z, (1, 0))
        sampled_z = project(sampled_z)
        outputs['interpolated'] = decoder(sampled_z, 
                                          num_filters=NUM_DECODER_FILTERS,
                                          is_training=False,
                                          reuse=True)    
    
    ## Additional Summaries
    add_glo_summaries(inputs, outputs, num_rows=NUM_ROWS)
    add_glo_config_summary()
        
    ## Launch the training session
    try:
        global_step_ = 0
        LOG_DIR = os.path.join(BASE_LOG_DIR, EXP_NAME, datetime.now().strftime("%m-%d_%H-%M"))
        with get_monitored_training_session() as sess:
            while not sess.should_stop():
                # If save images
                if (global_step_ + 1) % SAVE_IMAGES_STEPS == 0:
                    out_ = sess.run([global_step, loss, train_op] + 
                                    [outputs[k] for k in SAVE_IMAGES_KEYS])
                    global_step_, loss_ = out_[0], out_[1]
                    for k, img in zip(SAVE_IMAGES_KEYS, out_[3:]):
                        scipy.misc.imsave(
                            os.path.join(LOG_DIR, 'images', 
                                         '%s_%d.jpg' % (k, global_step_ + 1)), 
                            img[0])   
                # Normal step
                else:
                    global_step_,loss_, _ = sess.run([global_step, loss, train_op])
                print('\rStep %d: %.3f' % (global_step_, loss_), end='')
    except KeyboardInterrupt:
        print('\nInterrupted at step %d' % global_step_)
```

    Step 395618: 2.001

Here are some outputs from the model after training for some time:


```python
%matplotlib inline
# Display latest saved images
from matplotlib import pyplot as plt
image_dir = os.path.join(LOG_DIR, 'images')
max_indx = max([int(x.rsplit('.', 1)[0].rsplit('_', 1)[1])
                for x in glob.glob(os.path.join(image_dir, '*.jpg'))])
_, axis = plt.subplots(len(SAVE_IMAGES_KEYS), 1, figsize=(19, 35))
print(LOG_DIR)
print('%d training steps' % max_indx)
for i, k in enumerate(SAVE_IMAGES_KEYS):
    axis[i].set_axis_off()
    axis[i].set_title(k, fontsize=22)
    axis[i].imshow(scipy.misc.imread(os.path.join(image_dir, 
                                                  '%s_%d.jpg' % (k, max_indx))))    
plt.show()
```

    log/celeba_glo_128/11-13_01-07
    990001 training steps



![png](output_12_1.png)


And the result of searching for samples nearest neighbors in the training set:


```python
# Load samples
samples = scipy.misc.imread(os.path.join(image_dir, 'sampled_fitted_grid_%d.jpg' % max_indx)) / 255.
samples = [y_split for x_split in np.split(samples, NUM_ROWS, axis=0)
                   for y_split in np.split(x_split, NUM_ROWS, axis=1)]
samples = np.stack(samples, 0)
num_samples = samples.shape[0]
min_dists = np.ones((num_samples,))
nearest_neighbors = np.zeros_like(samples)

# Search for nearest neighbors among a certain number of images
num_images = 100000
image_files = glob.glob(os.path.join(BASE_DIR, '*.%s' % EXTENSION))[:num_images]
for i, image_file in enumerate(image_files):
    print('\r%d/%d' % (i + 1, len(image_files)), end='')
    # Preprocess image
    image = scipy.misc.imread(image_file)
    w, h, _ = image.shape
    min_side = 108 if TIGHT_CROP else min(w, h)
    offset_x = (w - min_side) // 2
    offset_y = (h - min_side) // 2
    image = image[offset_x:w - offset_x, offset_y:h - offset_y, :]
    image = scipy.misc.imresize(image, (SIZE, SIZE)) / 255.
    # Compare to samples (MSE)
    image = np.tile(np.expand_dims(image, 0), (num_samples, 1, 1, 1))
    dists = np.mean((image - samples)**2, axis=(1, 2, 3))
    min_indx = np.where(dists < min_dists)[0]
    # Update NNs
    nearest_neighbors[min_indx, ...] = image[min_indx, ...]
    min_dists[min_indx] = dists[min_indx]
    
# Grid view
out = np.concatenate([samples, nearest_neighbors], axis=1)
out = np.reshape(out, (2 * NUM_ROWS * NUM_ROWS, -1, SIZE, 3))
out = np.concatenate([x for x in out], axis=1)
out = np.split(out, NUM_ROWS, axis=1)
out = np.concatenate(out, axis=0)

# Imshow
fig, ax = plt.subplots(1, 1, figsize=(19, 12))
ax.set_axis_off()
ax.set_title('Nearest Neighbors among %d training images' % num_images, fontsize=22)
ax.imshow(out)
plt.show()
```

    100000/100000


![png](output_14_1.png)

