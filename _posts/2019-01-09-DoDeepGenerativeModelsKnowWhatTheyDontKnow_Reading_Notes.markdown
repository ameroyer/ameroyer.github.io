---
layout: post
title:  "do deep generative models know what they don't know ?"
date:   2019-01-09 18:00:00 +0200
tags: deep learning
categories: readingnotes
thumb: /images/thumbs/deepgenerativemodelsknow.png
---


This post contains my reading notes about the paper <a href="https://arxiv.org/abs/1810.09136" target="_blank"><i>"Do Deep Generative Models Know what They Don't Know ?"</i></a>, from Nalisnick et al. published in ICLR 2019.


CNNs prediction landscapes are known to be very sensitive to adversarial examples, which are samples  generated to be wrongly predicted with high confidence. On the other hand, <span class="keyword">probabilistic generative models</span> such as PixelCNN and VAEs learn a distribution over the input image domain hence could be used to detect ***out-of-distribution inputs***, e.g., by estimating their likelihood under the data distribution. This paper provides interesting results showing that distributions learned by generative models are not robust enough yet to employ them in this way. 

  * <span class="keyword">Pros (+):</span> Convincing experiments on multiple generative models, detailed analysis in the invertible flow case.
  * <span class="keyword">Cons (-):</span> It would be interesting to provide further results for different classes of input domain shifts to observe if this negative result is rather a property of the model or of the input data.
 

### <i class="fa fa-wrench"></i> Experimental results

Three classes of generative models are considered in this paper:

  * **Auto-regressive** models such as PixelCNN <span class="citations">[1]</span>
  * **Latent variable** models, such as VAEs <span class="citations">[2]</span>
  * Generative models with **invertible flows** <span class="citations">[3]</span>, and in particular, <span class="citations">[4]</span>. 
  
The  first, and main, experiment the authors propose is to train a generative model $$G$$ on input data $$\mathcal X$$ and to then evaluate the likelihood of both the training domain $$\mathcal X$$ and a different domain $$\tilde{\mathcal X}$$ under the learned model. 
Their results lead to the negative claim that <span class="keyword">a model trained on the CIFAR-10 dataset yields a higher likelihood when evaluated on the SVHN test dataset than on the CIFAR-10 test (or even train) split</span>. Interestingly, the  converse, when training on SVHN and evaluating on CIFAR, is not true. 

This result was consistently observed for various architectures including <span class="citations">[1]</span>, <span class="citations">[2]</span> and <span class="citations">[4]</span>, although it is of lesser effect in the PixelCNN case. Detailed results for the Glow architecture <span class="citations">[4]</span> are reported in **Figure 1**.

<div style="text-align: center">
<img src="/images/readingnotes/dodeepgenerativemodelsknowwhattheydontknow_fig1.png">

<br><b>Figure 1:</b> Histogram of Glow log-likelihoods for FashionMNIST vs MNIST <i>(a)</i>, CIFAR10 vs SVHN <i>(b)</i>, CelebA vs SVHN <i>(c)</i>, and ImageNet vs CIFAR-10 / CIFAR-100 / SVHN <i>(d)</i>.
</div>
<br>


Intuitively, this could come from the fact that both of these datasets contain natural images while CIFAR-10 is strictly more diverse than SVHN in terms of semantic content. Nonetheless, these datasets vastly differ in appearance, and this result is counter-intuitive as it goes against the direction that probabilistic generative models should be able to reliably detect out-of-distribution samples. Furthermore, this observation also confirms the general idea that <span class="keyword">higher likelihoods does not necessarily coincide with better generated samples</span>, as noted in <span class="citations">[5]</span>.

###  <i class="fa fa-edit"></i> Analytical result for Invertible Flow models

The authors further study this phenomenon in the <span class="keyword">invertible flows</span> models case as they provide a more rigorous analytical framework (e.g., exact likelihood estimation unlike VAEs which only provide a bound on the true likelihood). 

More specifically invertible flow models are characterized with a diffeomorphism,  $$f(x; \phi)$$, between input space $$\mathcal X$$ and latent space $$\mathcal Z$$, and choice of the latent distribution $$p(z; \psi)$$. The <span class="keyword">change of variable formula</span> links the density of $$x$$ and $$z$$ as follows:

$$
\begin{align}
\int_x p_x(x)d_x = \int_x p_z(f(x)) \left| \frac{\partial f}{\partial x} \right| dx
\end{align}
$$

And the training objective under this transformation becomes:

$$
\begin{align}
\arg\max_{\theta} \log p_x(\mathbf{x}; \theta) = \arg\max_{\phi, \psi} \sum_i \log p_z(f(x_i; \phi); \psi) + \log \left| \frac{\partial f_{\phi}}{\partial x_i} \right|
\end{align}
$$

Typically, $$p_z$$ is chosen to be Gaussian, and samples are build by inverting $$f$$, i.e.,$$\tilde(z) \sim p(\mathbf z),\ \tilde x = f^{-1}(\tilde z)$$. And $$f_{\phi}$$ is build such that computing the log determinant of the Jacobian in the previous equation is tractable.

First, they observe that contribution of the flow can be decomposed in a <span class="keyword">density</span> element (*left term*) and a <span class="keyword">volume</span> element (*right term*), resulting from the change of variables formula. Experiment results with Glow [4] show that the higher density  on SVHN mostly comes from the volume element contribution.
Interestingly this negative results seems quite robust: The authors also performed experiments with different types of flow formulation, e.g., constant volume flows (where the volume term  is constant for all $$x$$) and with an ensemble of generative models, and still observe similar trends.
  
Secondly, they also try to directly analyze the difference in likelihood between two domains $$\mathcal X$$ and $$\tilde{\mathcal X}$$; which can be done by a <span class="keyword">second-order expansion</span> of the log-likelihood locally around the expectation of the distribution (assuming $$\mathbb{E} (\mathcal X) \sim \mathbb{E}(\tilde{\mathcal X})$$). For the constant volume Glow case, the resulting analytical form indeed confirms that the log-likelihood of SVHN should be higher than CIFAR's under the model.
In some sense, SVHN is "included" in CIFAR (under the model distribution) but has lower variance, which explains the higher likelihood.
  
  
### References

  * <span class="citations">[1]</span> Conditional Image Generation with PixelCNN Decoders, van den Oord et al, 2016
  * <span class="citations">[2]</span> Auto-Encoding Variational Bayes, Kingma and Welling, 2013
  * <span class="citations">[3]</span> Density estimation using Real NVP, Dinh et al., ICLR 2015
  * <span class="citations">[4]</span> Glow: Generative Flow with Invertible 1x1 Convolutions, Kingma and Dhariwal
  * <span class="citations">[5]</span> A Note on the Evaluation of Generative Models, Theis et al., ICLR 2016

