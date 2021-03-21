---
layout: post
title:  "Glow: Generative Flow with Invertible 1×1 Convolutions"
date:   2019-05-07 14:59:24 +0200
tags: [generative models, reversible networks, neurips, 2018]
categories:  [Generative Models]
author: D. Kingma and P. Dhariwal, NeurIPS 2018, <a href='https://arxiv.org/abs/1807.03039' target='_blank'>[link]</a>
thumb: /images/thumbs/glow.png
year: 2018
---


<div class="summary">
Invertible flow based generative models such as <span class="citations">[2, 3]</span> have several advantages including exact likelihood inference process (unlike <code>VAE</code>s or <code>GAN</code>s) and easily parallelizable training and inference (unlike the sequential generative process in auto-regressive models). This paper proposes a new, more flexible, form of <b>invertible flow</b> for generative models, which builds on <span class="citations">[3]</span>.
<ul>
<li><span class="procons">Pros (+):</span>  Very clear presentation, promising results both quantitative and qualitative.</li>
<li><span class="procons">Cons (-):</span> One of the disadvantages of the models seem to be a large number of parameters, it would be interesting to have a more detailed report on training time. Also a comparison to <span class="citations">[5]</span> (a variant of <code>PixelCNN</code> that allows for faster parallelized sample generation) would be nice.</li>
</ul>
</div>



<h3 class="section theory"> Invertible flow-Based Generative Models  </h3>

Given input data $$x$$, invertible  flow-based generative models are built as two steps processes that generate data from an intermediate latent representation $$z$$:

$$
\begin{align}
z \sim p_{\theta}(z)\\
x = g_\theta(z)
\end{align}
$$

 where $$g_\theta$$ is an *invertible* function, i.e. a bijection, $$g_\theta: \mathcal X \rightarrow \mathcal Z$$. It acts  as an encoder from the input data to the latent space.
  $$g$$  is usually built as a sequence of smaller invertible functions $$g = g_1 \circ \dots \circ g_n$$. Such a sequence is also called a *normalizing flow* <span class="citations">[1]</span>. Under this construction, the *change of variables formula* applied to $$x = g(z)$$ gives the following equivalence between the input and latent densities:

$$
\begin{align}
\log p(x) &= \log p(z) + \log\ \left| \det \left( \frac{d z}{d x} \right)\right|\\
&= \log p(z) + \sum_{i=1}^n \log\ \left| \det \left( \frac{g_{\leq i}(x)}{g_{\leq i - 1}(x)} \right)\right|
\end{align}
$$

where $$\forall i \in [1; n],\ g_{\leq i} = g_i \circ \dots g_1$$ In particular, this means $$g_{\leq n}(x) = z$$ and $$g_0(x) = x$$. $$p_\theta(z)$$ is usually chosen as a simple density such as a unit Gaussian distribution, $$p_\theta(z) = \mathcal N(z; 0, \mathbf{I})$$.
In order to efficiently estimate the likelihood, the functions $$g_1, \dots g_n$$ are usually chosen such that the *log-determinant of the Jacobian*, $$\log\ \left\vert \det \left( \frac{g_{\leq i}}{g_{\leq i - 1}}  \right) \right\vert$$, is easily computed, for instance by choosing transformation such that the Jacobian is a triangular matrix.

---

<h3 class="section proposed"> Proposed Flow Construction: GLOW</h3>

#### Flow step
Each flow step function $$g_i$$ is a sequence of three operations as follows. Given an input tensor of dimensions $$h \times w \times c$$:

| Step Description | Functional Form of flow $$g_i$$ | Inverse  Function of the flow, $$g_i^{-1}$$| Log-determinant Expression|
| ------- | ------------------- | --------------------------- | ------------ | --------------------------- |
| **ActNorm**  <br> $$s: [c,]$$ <br> $$b: [c,]$$ | $$y = \sigma\odot x + \mu$$ | $$x = (y - \mu) / \sigma$$ | $$hw\ \mbox{sum} \log(\vert\sigma\vert)$$ |
| **1x1 conv** <br> $$W: [c,c]$$  | $$y = Wx$$ | $$x = W^{-1}y$$ | $$h w \log \vert \det (W) \vert$$ |
| **Affine Coupling** <br> **(ACL)** [2] |  $$x_a,\ x_b = \mbox{split}(x)$$ <br> $$(\log \sigma, \mu) = \mbox{NN}(x_b)$$ <br> $$y_a = \sigma \odot x_a + \mu$$ <br> $$y = \mbox{concat}(y_a, x_b)$$|    $$y_a,\ y_b = \mbox{split}(y)$$ <br> $$(\log \sigma, \mu) = \mbox{NN}(x_b)$$ <br> $$x_a = (y_a - \mu) / \sigma$$  <br> $$x = \mbox{concat}(x_a, y_b)$$|$$\mbox{sum} (\log \vert\sigma\vert)$$ |


<br>
  * **ActNorm.** The activation normalization layer is introduced as a replacement for *Batch Normalization* (`BN`) to avoid degraded performance with small mini-batch sizes, e.g. when training with batch size 1. This layer has the same form as `BN`, however the *bias, $$\mu$$, and variance, $$\sigma$$, are data-independent variables*: They are initialized based on an initial mini-batch of data (data-dependent initialization), but are optimized during training with the rest of the parameters, rather than estimated from the input minibatch statistics.

  * **1x1 convolution.** This is a simple 1x1 convolutional layer. In particular, the cost of computing the determinant of $$W$$ can be reduced by writing $$W$$ in its *LU decomposition*, although this increases the number of parameters to be learned.

  * **Affine Coupling Layer.** The `ACL` was introduced in <span class="citations">[2]</span>. The input tensor $$x$$ is first split in half along the channel dimension. The second half, $$x_b$$, is fed through a small neural network to get parameters $$\sigma$$ and $$\mu$$, and the corresponding affine transformation is applied to the first half,  $$x_a$$.
The rescaled $$x_a$$ is the actual transformed output of the layer, however $$x_b$$ also has to be propagated in order to make the transformation invertible, such that $$\sigma$$ and $$\mu$$ can also be estimated in the reverse flow.
Finally, note that the previous 1x1 convolution can be seen as a generalized *permutation of the input channels*, and guarantees that different channels combinations are seen during the `split` operation.


#### General Pipeline
These operations are then combined in a *multi-scale architecture* as described in <span class="citations">[3]</span>, which in particular relies on a *squeezing* operation to trade of spatial resolution for number of output channels.
Given an input tensor of size $$s \times s \times c$$, the squeezing operator takes blocks of size $$2 \times 2 \times c$$ and flatten them to size $$1 \times 1 \times 4c$$, which can easily be inverted by reshaping.
The final pipeline consists in $$L$$ levels that operate on different scales: each level is composed of $$K$$ flow steps and a final squeezing operation.

<div class="figure">
<img src="{{ site.baseurl }}/images/posts/glow.png">
<p><b>Figure:</b> Overview of the multi-layer <code>GLOW</code> architecture.</p>
</div>

In summary, the *main differences* with <span class="citations">[3]</span> are:
  * Batch Normalization is replaced with Activation Normalization
  * 1x1 convolutions are considered as a more generic operation to replace permutations
  * Only channel-wise splitting is considered in the Affine Coupling Layer, while <span class="citations">[3]</span>  also considered a binary spatial checkerboard pattern to split the input tensor in two.


---


<h3 class="section experiments"> Experiments </h3>

#### Implementation
In practice, the authors implement `NN` as a convolutional neural network of depth 3 in the `ACL`; which means that each flow step contains 4 convolutions in total. They also use $$K = 32$$ flow steps in each level. Finally the number of levels $$L$$ is 3 for small-scale experiments (32x32 images) and 6 for large scale (256x256 ImageNet images).
In particular this means that the model contains *a lot of parameters* ($$L \times K \times 4$$ convolutions) which might be a practical disadvantage compared to other method that produce samples of similar quality, e.g. `GAN`s. However, contrary to these models, `GLOW` provides *exact likelihood inference*.


#### Results
`GLOW` outperforms `RealNVP` <span class="citations">[3]</span> in terms of data likelihood, as evaluated on standard benchmarks (ImageNet, CIFAR-10, LSUN). In particular, the 1x1 convolutions performs better than other more specific permutations operations, and only introduces a small computational overhead.

Qualitatively, the samples are of great quality and the model  seems to scale well with higher resolution. However this greatly increases the *memory requirements*. Leveraging the model's invertibility to avoid storing activations during the feed-forward pass such as in <span class="citations">[4]</span>  could be used to (partially) palliate the problem.

---

<h3 class="section references"> References </h3>

  * <span class="citations">[1]</span>  Variational inference with normalizing flows, <i>Rezende and Mohamed, ICML 2015</i>
  * <span class="citations">[2]</span> NICE: Non-linear Independent Components Estimation, <i>Dinh et al., ICLR 2015</i>
  *  <span class="citations">[3]</span>  Density estimation using Real NVP, <i>Dinh et al., ICLR 2017</i>
  * <span class="citations">[4]</span>  The Reversible Residual Network: Backpropagation Without Storing Activations, <i>Gomez et al., NeurIPS 2017 </i>
  * <span class="citations">[5]</span> Parallel Multiscale Autoregressive Density Estimation, <i>S.Reed et al, ICML 2017</i>
