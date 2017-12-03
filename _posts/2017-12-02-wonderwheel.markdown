---
layout: post
title:  "wonderwheel"
date:   2017-12-02 10:00:00 +0200
categories: visualization, data, html, css, python
thumb: /images/thumbs/wonderwheel.png
---


Wonderwheel is a small data visualization project for representing images as animated hue histogram. More specifically, an image will be represented as three separate hue histograms (for visually black pixels, white pixels, and the rest, i.e. "color" pixels). 

The animation is obtained by generating such histograms at different stages of blurriness of the image (in decreasing order) and is displayed using *CSS3* transitions. 
See below for an example of such visualizations:


<link rel="stylesheet" href="/notebooks/2017_12_02_wonderwheel/html/image2.css">
<link rel="stylesheet" href="/notebooks/2017_12_02_wonderwheel/html/image3.css">

<div style="width:10%; float:right">
<table border="1" cellpadding="6" align="right">
<tr>
<td><a style="color:#5E412F" href="/notebooks/2017_12_02_wonderwheel/wonderwheel.ipynb">Download .ipynb notebook</a></td>
</tr>
</table>
</div>

<div style="width:444px; height:444px; position:relative; top:10px; left:0px; float:left">
    <img style="border-radius: 50%; border: 0; top: 122px; left:122px; height: 200px; width:200px; position:relative" src="/notebooks/2017_12_02_wonderwheel/images/image2.jpeg">
    
       <div class ="frame">
           <div class="bar" id="bar0_black"></div>
           <div class="bar" id="bar0_white"></div>
           <div class="bar" id="bar0_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar1_black"></div>
           <div class="bar" id="bar1_white"></div>
           <div class="bar" id="bar1_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar2_black"></div>
           <div class="bar" id="bar2_white"></div>
           <div class="bar" id="bar2_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar3_black"></div>
           <div class="bar" id="bar3_white"></div>
           <div class="bar" id="bar3_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar4_black"></div>
           <div class="bar" id="bar4_white"></div>
           <div class="bar" id="bar4_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar5_black"></div>
           <div class="bar" id="bar5_white"></div>
           <div class="bar" id="bar5_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar6_black"></div>
           <div class="bar" id="bar6_white"></div>
           <div class="bar" id="bar6_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar7_black"></div>
           <div class="bar" id="bar7_white"></div>
           <div class="bar" id="bar7_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar8_black"></div>
           <div class="bar" id="bar8_white"></div>
           <div class="bar" id="bar8_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar9_black"></div>
           <div class="bar" id="bar9_white"></div>
           <div class="bar" id="bar9_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar10_black"></div>
           <div class="bar" id="bar10_white"></div>
           <div class="bar" id="bar10_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar11_black"></div>
           <div class="bar" id="bar11_white"></div>
           <div class="bar" id="bar11_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar12_black"></div>
           <div class="bar" id="bar12_white"></div>
           <div class="bar" id="bar12_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar13_black"></div>
           <div class="bar" id="bar13_white"></div>
           <div class="bar" id="bar13_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar14_black"></div>
           <div class="bar" id="bar14_white"></div>
           <div class="bar" id="bar14_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar15_black"></div>
           <div class="bar" id="bar15_white"></div>
           <div class="bar" id="bar15_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar16_black"></div>
           <div class="bar" id="bar16_white"></div>
           <div class="bar" id="bar16_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar17_black"></div>
           <div class="bar" id="bar17_white"></div>
           <div class="bar" id="bar17_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar18_black"></div>
           <div class="bar" id="bar18_white"></div>
           <div class="bar" id="bar18_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar19_black"></div>
           <div class="bar" id="bar19_white"></div>
           <div class="bar" id="bar19_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar20_black"></div>
           <div class="bar" id="bar20_white"></div>
           <div class="bar" id="bar20_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar21_black"></div>
           <div class="bar" id="bar21_white"></div>
           <div class="bar" id="bar21_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar22_black"></div>
           <div class="bar" id="bar22_white"></div>
           <div class="bar" id="bar22_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar23_black"></div>
           <div class="bar" id="bar23_white"></div>
           <div class="bar" id="bar23_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar24_black"></div>
           <div class="bar" id="bar24_white"></div>
           <div class="bar" id="bar24_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar25_black"></div>
           <div class="bar" id="bar25_white"></div>
           <div class="bar" id="bar25_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar26_black"></div>
           <div class="bar" id="bar26_white"></div>
           <div class="bar" id="bar26_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar27_black"></div>
           <div class="bar" id="bar27_white"></div>
           <div class="bar" id="bar27_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar28_black"></div>
           <div class="bar" id="bar28_white"></div>
           <div class="bar" id="bar28_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar29_black"></div>
           <div class="bar" id="bar29_white"></div>
           <div class="bar" id="bar29_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar30_black"></div>
           <div class="bar" id="bar30_white"></div>
           <div class="bar" id="bar30_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar31_black"></div>
           <div class="bar" id="bar31_white"></div>
           <div class="bar" id="bar31_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar32_black"></div>
           <div class="bar" id="bar32_white"></div>
           <div class="bar" id="bar32_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar33_black"></div>
           <div class="bar" id="bar33_white"></div>
           <div class="bar" id="bar33_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar34_black"></div>
           <div class="bar" id="bar34_white"></div>
           <div class="bar" id="bar34_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar35_black"></div>
           <div class="bar" id="bar35_white"></div>
           <div class="bar" id="bar35_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar36_black"></div>
           <div class="bar" id="bar36_white"></div>
           <div class="bar" id="bar36_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar37_black"></div>
           <div class="bar" id="bar37_white"></div>
           <div class="bar" id="bar37_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar38_black"></div>
           <div class="bar" id="bar38_white"></div>
           <div class="bar" id="bar38_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar39_black"></div>
           <div class="bar" id="bar39_white"></div>
           <div class="bar" id="bar39_color"></div>
       </div>
</div>


<div style="width:444px; height:444px; margin-bottom:25px; margin-left:50%; top:10px; position:relative">
    <img style="border-radius: 50%; border: 0; top: 122px; left:122px; height: 200px; width:200px; position:relative" src="/notebooks/2017_12_02_wonderwheel/images/image3.jpeg">
    
<div class ="frame">
   <div class="bar2_" id="bar2_0_black"></div>
   <div class="bar2_" id="bar2_0_white"></div>
   <div class="bar2_" id="bar2_0_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_1_black"></div>
   <div class="bar2_" id="bar2_1_white"></div>
   <div class="bar2_" id="bar2_1_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_2_black"></div>
   <div class="bar2_" id="bar2_2_white"></div>
   <div class="bar2_" id="bar2_2_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_3_black"></div>
   <div class="bar2_" id="bar2_3_white"></div>
   <div class="bar2_" id="bar2_3_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_4_black"></div>
   <div class="bar2_" id="bar2_4_white"></div>
   <div class="bar2_" id="bar2_4_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_5_black"></div>
   <div class="bar2_" id="bar2_5_white"></div>
   <div class="bar2_" id="bar2_5_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_6_black"></div>
   <div class="bar2_" id="bar2_6_white"></div>
   <div class="bar2_" id="bar2_6_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_7_black"></div>
   <div class="bar2_" id="bar2_7_white"></div>
   <div class="bar2_" id="bar2_7_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_8_black"></div>
   <div class="bar2_" id="bar2_8_white"></div>
   <div class="bar2_" id="bar2_8_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_9_black"></div>
   <div class="bar2_" id="bar2_9_white"></div>
   <div class="bar2_" id="bar2_9_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_10_black"></div>
   <div class="bar2_" id="bar2_10_white"></div>
   <div class="bar2_" id="bar2_10_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_11_black"></div>
   <div class="bar2_" id="bar2_11_white"></div>
   <div class="bar2_" id="bar2_11_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_12_black"></div>
   <div class="bar2_" id="bar2_12_white"></div>
   <div class="bar2_" id="bar2_12_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_13_black"></div>
   <div class="bar2_" id="bar2_13_white"></div>
   <div class="bar2_" id="bar2_13_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_14_black"></div>
   <div class="bar2_" id="bar2_14_white"></div>
   <div class="bar2_" id="bar2_14_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_15_black"></div>
   <div class="bar2_" id="bar2_15_white"></div>
   <div class="bar2_" id="bar2_15_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_16_black"></div>
   <div class="bar2_" id="bar2_16_white"></div>
   <div class="bar2_" id="bar2_16_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_17_black"></div>
   <div class="bar2_" id="bar2_17_white"></div>
   <div class="bar2_" id="bar2_17_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_18_black"></div>
   <div class="bar2_" id="bar2_18_white"></div>
   <div class="bar2_" id="bar2_18_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_19_black"></div>
   <div class="bar2_" id="bar2_19_white"></div>
   <div class="bar2_" id="bar2_19_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_20_black"></div>
   <div class="bar2_" id="bar2_20_white"></div>
   <div class="bar2_" id="bar2_20_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_21_black"></div>
   <div class="bar2_" id="bar2_21_white"></div>
   <div class="bar2_" id="bar2_21_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_22_black"></div>
   <div class="bar2_" id="bar2_22_white"></div>
   <div class="bar2_" id="bar2_22_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_23_black"></div>
   <div class="bar2_" id="bar2_23_white"></div>
   <div class="bar2_" id="bar2_23_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_24_black"></div>
   <div class="bar2_" id="bar2_24_white"></div>
   <div class="bar2_" id="bar2_24_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_25_black"></div>
   <div class="bar2_" id="bar2_25_white"></div>
   <div class="bar2_" id="bar2_25_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_26_black"></div>
   <div class="bar2_" id="bar2_26_white"></div>
   <div class="bar2_" id="bar2_26_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_27_black"></div>
   <div class="bar2_" id="bar2_27_white"></div>
   <div class="bar2_" id="bar2_27_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_28_black"></div>
   <div class="bar2_" id="bar2_28_white"></div>
   <div class="bar2_" id="bar2_28_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_29_black"></div>
   <div class="bar2_" id="bar2_29_white"></div>
   <div class="bar2_" id="bar2_29_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_30_black"></div>
   <div class="bar2_" id="bar2_30_white"></div>
   <div class="bar2_" id="bar2_30_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_31_black"></div>
   <div class="bar2_" id="bar2_31_white"></div>
   <div class="bar2_" id="bar2_31_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_32_black"></div>
   <div class="bar2_" id="bar2_32_white"></div>
   <div class="bar2_" id="bar2_32_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_33_black"></div>
   <div class="bar2_" id="bar2_33_white"></div>
   <div class="bar2_" id="bar2_33_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_34_black"></div>
   <div class="bar2_" id="bar2_34_white"></div>
   <div class="bar2_" id="bar2_34_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_35_black"></div>
   <div class="bar2_" id="bar2_35_white"></div>
   <div class="bar2_" id="bar2_35_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_36_black"></div>
   <div class="bar2_" id="bar2_36_white"></div>
   <div class="bar2_" id="bar2_36_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_37_black"></div>
   <div class="bar2_" id="bar2_37_white"></div>
   <div class="bar2_" id="bar2_37_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_38_black"></div>
   <div class="bar2_" id="bar2_38_white"></div>
   <div class="bar2_" id="bar2_38_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_39_black"></div>
   <div class="bar2_" id="bar2_39_white"></div>
   <div class="bar2_" id="bar2_39_color"></div>
</div>
</div>

The histograms are build in the following way:

  * I first map the input image to the HSV (Hue Saturation Value) domain

```python
    # RGB -> HSV
    hue, sat, val = np.split(colors.rgb_to_hsv(image / 255.), 3, axis=-1)
```

  * Then I exclude visually white and black pixels (i.e., those whose value is not in a certain given range), for which I build a separate histogram 

```python
    # isolate black and white tones by value
    white_values = np.where(val > white_value_threshold)
    black_values = np.where(val < black_value_threshold)
    
    # Black tones histograms
    hue_bins = np.linspace(0.0, 1.0, num_bins + 1, endpoint=True)
    mask = np.zeros_like(hue)
    mask[black_values] = sat[black_values]**sat_weight
    black_hist, _ = np.histogram(hue, bins=hue_bins, weights=mask)
    black_hist[np.isnan(black_hist)] = 0.
    
    # White tones histograms
    mask = np.zeros_like(hue)
    mask[white_values] = sat[white_values]**sat_weight
    white_hist, _ = np.histogram(hue, bins=hue_bins, weights=mask)
    white_hist[np.isnan(white_hist)] = 0.
```

  * The remaining pixels will be used to compute the hue histograms. Each hue is additionally weighted by its saturation (low saturation values get smaller weights) and its "originality" (how far it is from the average hue in the image). The color of the bar is additionally affected by the average saturation and value for this specific hue in the image.

```python
    # Build the weighted hue histogram
    hue[white_values] = -1
    hue[black_values] = -1
    weights = 1. + originality_weight * np.abs(hue - np.mean(hue[hue >= 0])) * sat**sat_weight
    hue_hist, _ = np.histogram(hue, bins=hue_bins, weights=weights)
    hue_hist[np.isnan(hue_hist)] = 0.

    # Compute bar colors based on average saturation and value
    data['colors'] = []
    for i, bin_center in enumerate(hue_bins):
        index = np.where((hue > bin_center  - bins_offset) & (hue < bin_center + bins_offset))
        color = colorsys.hsv_to_rgb(bin_center, 1., 1.)
        if index[0].shape[0] > 0: 
            color = colorsys.hsv_to_rgb(bin_center, np.mean(sat[index]), np.mean(val[index]))
        data['colors'].append([int(x * 255) for x in color])
```


<div style="text-align:center">
	<img src="/notebooks/2017_12_02_wonderwheel/matprotlib_preview.png">
</div>


Finally, I added a small animation component for the visualization. I generate a color histogram for a given image  at different stage of bluriness (Gaussian filter with decreasing variance); the result is animated using simple html and css3 transitions.



```python
    # Collect data
    image = imread(image_path)
    if resize is not None:
        w, h, _ = image.shape
        ratio = resize / max(w, h)
        image = imresize(image, (int(ratio * image.shape[0]),
                                 int(ratio * image.shape[1])))
    data = {}
    resolutions = np.linspace(40., 0., num_resolutions, endpoint=True)
    for r in resolutions:
        aux = ndimage.gaussian_filter(image, sigma=r)
        aux = create_equalizer(aux, num_bins=num_bins)
        if 'centers' not in data:
            data = aux
            for key in ['hues', 'white', 'black']:
                data[key] = np.expand_dims(data[key], 0)
        else:
            for key in ['hues', 'white', 'black']:
                data[key] = np.concatenate([data[key], 
                                            np.expand_dims(aux[key], 0)],
                                           axis=0)
                
    # Add time points
    times = np.linspace(5, 75, num_resolutions, endpoint=True)

    # Base template       
    css_template = """
    .frame {
        position: absolute;
        top: 0;
        margin:0;
        }
    .{base_name} {
        position: relative;
        width: {bar_width}px;
        margin:0;
        float: left;
        }
    """.format(base_name=base_name,
               bar_width=bar_width)

 # Define bar 
    bar_template = """
    #{name} {
        left: {pos_left}px;
        top: {pos_top}px;
        background-color: rgb({r}, {g}, {b});
        -webkit-animation: {name}_anim {duration}s ease-out infinite ; 
        animation: {name}_anim {duration}s ease-out infinite;
        -ms-transform: rotate({rot}deg); /* IE 9 */
        -webkit-transform: rotate({rot}deg); /* Safari */
        transform: rotate({rot}deg);
        -webkit-transform-origin: 50% 0%;
        -moz-transform-origin: 50% 0%;
        -o-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        border: {border_width}px solid {border_color};
        }
    """
    
    # Define bar animation
    def write_anim(name, heights, colors=None):
        assert len(times) == len(heights)
        template = ""
        start = 'from'
        if colors is None:
            for i in range(len(times)):
                template += "%d%% {height: %dpx;}\n" % (times[i], int(heights[i]))
        else:
            for i in range(len(times)):
                template += "%d%% {height: %dpx; background:rgb(%d, %d, %d)}\n" % (
                    times[i], int(heights[i]), colors[i][0], colors[i][1], colors[i][2])
        # template
        template =  """       
        @-webkit-keyframes
        {name}_anim {
            {content}
        }
        """.format(name=name, content=template)
        return template
    
    # Write CSS
    with open('%s.css' % output_name, 'w') as f:
        f.write(css_template)
        for i in range(num_bars):
            angle = int((data['centers'][i] - norm_angle) * 360)
            offset_top = np.sin((angle + 90.) / 360. * 2 * np.pi)
            offset_left = np.cos((angle + 90.)/ 360. * 2 * np.pi)

            # Color bars
            offset_length += max_white_bar_height + image_border
            name = "%s%d_color" % (base_name, i)
            border_color = 'white'
            if sum(np.round(data['hues'][:, i])) > 0.:
                f.write(write_anim(name, data['hues'][:, i], 
                                   colors=[data['colors'][i] for _ in range(len(times))]))
                border_color = "rgb(%s, %s, %s)" % (data['colors'][i][0], 
						    data['colors'][i][1], 
                                                    data['colors'][i][2])
            f.write(bar_template.format(
                    name=name, 
                    duration=duration,
                    pos_top=center + int(offset_top * offset_length),
                    pos_left=(center + int(offset_left * offset_length) 
			     - 2 * bar_width - bar_width // 2),
                    rot=angle, 
                    r=data['colors'][i][0],
                    g=data['colors'][i][1],
                    b=data['colors'][i][2],
                    border_width=1,
                    border_color=border_color))
            
            # ... similar for black and white bars ...
```

