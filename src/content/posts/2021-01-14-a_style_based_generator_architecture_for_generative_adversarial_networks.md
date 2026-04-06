---
title: "A Style-Based Generator Architecture for Generative Adversarial Networks"
date: 2021-01-14
tags: [generative models]
categories: [Generative Models]
author: "Karras et al."
venue: CVPR
paperurl: "https://arxiv.org/abs/1812.04948"
thumb: /images/thumbs/notes/todo.png
year: 2019
---

<div class="summary">
  In this work, the authors propose <code>StyleGAN</code>, a novel generator architecture for Generative Adversarial Networks that disentangles high-level attributes (such as pose and identity when trained on human faces) from stochastic variation (such as freckles, hair) in the generated images. The architecture is based on mapping the latent code through a mapping network before injecting style at different scales.

  <ul>
    <li><span class="pros">Pros (+):</span> State-of-the-art image quality, disentangled latent space with nice interpolation properties.</li>
    <li><span class="cons">Cons (-):</span> High computational cost, complex architecture with many hyperparameters.</li>
  </ul>
</div>

## Proposed

### Discrete latent space

The model is based on `VAE` <span class="citations">[1]</span>, where image $$x$$ is generated from random latent variable $$z$$ by a _decoder_ $$p(x\ \vert\ z)$$. The posterior (_encoder_) captures the latent variable distribution $$q_{\phi}(z\ \vert\ x)$$ and is generally trained to match a certain distribution $$p(z)$$ from which $$z$$ is sampled from at inference time.
Contrary to the standard framework, in this work _the latent space is discrete_, i.e., $$z \in \mathbb{R}^{K \times D}$$ where $$K$$ is the number of codes in the latent space and $$D$$ their dimensionality. More precisely, the input image is first fed to $$z_e$$, that outputs a continuous vector, which is then mapped to one of the latent codes in the discrete space via _nearest-neighbor search_.

$$
\begin{align}
q(z = z_k\ |\ x) = [\!| k = \arg\min_j \| z_e(x) - z_j \|^2 |\!]
\end{align}
$$

Adapting the $$\mathcal{L}_{\text{ELBO}}$$ to this formalism, the KL divergence term greatly simplifies and we obtain:

$$
\begin{align}
\mathcal{L}_{\text{ELBO}}(x) &= \text{KL}(q(z | x) \| p(z)) - \mathbb{E}_{z \sim q(\cdot | x)}(\log p(x | z))\\
&= - \log(p(z_k)) -  \log p(x | z_k)\\
\text{where }& z_k = z_q(x) = \arg\min_z \| z_e(x) - z \|^2 \tag{1}
\end{align}
$$

In practice, the authors use a categorical _uniform prior_ for the latent codes, meaning the KL divergence is constant and the objective reduces to the reconstruction loss.

<div class="figure">
<img src="/images/posts/vqvae.png">
<p><b>Figure:</b>  A figure describing the <code>VQ-VAE</code> (<b>left</b>). Visualization of the embedding space (<b>right</b>)). The output of the encoder z(x) is mapped to the nearest point. The gradient (in <span style="color:red">red</span>) will push the
encoder to change its output, which could alter the configuration, hence the code assignment, in the next forward pass.</p>
</div>

### Training Objective

As we mentioned previously, the $$\mathcal{L}_{\text{ELBO}}$$ objective reduces to the _reconstruction loss_ and is used to learn the encoder and decoder parameters. However the mapping from $$z_e$$ to $$z_q$$ is not straight-forward differentiable (Equation **(1)**).
To palliate this, the authors use a _straight-through estimator_, meaning the gradients from the decoder input $$z_q(x)$$ (quantized) are directly copied to the encoder output $$z_e(x)$$ (continuous).
However, this means that the latent codes that intervene in the mapping from $$z_e$$ to $$z_q$$ do not receive gradient updates that way.

Hence in order to train the discrete embedding space, the authors propose to use _Vector Quantization_ (`VQ`), a dictionary learning technique, which uses mean squared error to make the latent code closer to the continuous vector it was matched to:

$$
\begin{align}
\mathcal{L}_{\text{VQ-VAE}}(x) = -  \log p(x | z_q(x)) + \| \overline{z_e(x)} - e \|^2 + \beta  \| z_e(x) - \bar{e} \|^2
\end{align}
$$

where $$x \mapsto  \overline{x}$$ denotes the `stop gradient` operator. The first term is the reconstruction loss stemming from the ELBO, the second term is the vector quantization contribution. Finally, the last term is a _commitment loss_ to control the volume of the latent space by forcing the encoder to "commit" to the latent code it matched with, and not grow its output space unbounded.

### Learned Prior

A second contribution of this work consists in _learning the prior distribution_. As mentioned, during the training phase, the prior $$p(z)$$ is a uniform categorical distribution. After the training is done, we fit an _autoregressive distribution_ over the space of latent codes. This is in particular enabled by the fact that the latent space is discrete.

**Note:** It is not clear to me if the autoregressive model is trained on latent codes sampled from the prior $$z \sim p(z)$$ or from the encoder distribution $$x \sim \mathcal{D};\ z \sim q(z\ \vert\ x)$$

## Experiments

The proposed model is mostly compared to the standard continuous `VAE` framework. It seems to achieve similar log-likelihood and sample quality, while taking advantage of the discrete latent space. In particular
For ImageNet for instance, they consider $$K = 512$$ latent codes with dimensions $$1$$. The output of the fully-convolutional encoder $$z_e$$ is a feature map of size $$32 \times 32 \times 1$$ which is then quantized _pixel-wise_. Interestingly, the model still performs well when using a powerful decoder (here, PixelCNN <span class="citations">[2]</span>) which seems to indicate it does not suffer from _posterior collapse_ as strongly as the standard continuous `VAE`.

A second set of experiments tackles the problem of audio modeling. The performance of the model are once again satisfying. Furthermore, it does seem like the discrete latent space actually captures relevant characteristics of the input data structure, although this is a purely qualitative observation.

## References

- <span class="citations">[1]</span> Autoencoding Variational Bayes, <i>Kingma and Welling, ICLR 2014</i>
- <span class="citations">[2]</span> Pixel Recurrent Neural Networks, <i>van den Oord et al, arXiv 2016</i>
