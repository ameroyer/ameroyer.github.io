---
layout: post
title:  "Domain Generalization with Adversarial Feature Learning"
date:   2019-04-30 8:59:24 +0200
tags: [domain adaptation, domain generalization, cvpr, 2018]
categories:  [Domain Adaptation]
author: Li et al, CVPR 2018, <a href='http://openaccess.thecvf.com/content_cvpr_2018/papers/Li_Domain_Generalization_With_CVPR_2018_paper.pdf' target='_blank'>[link]</a>
thumb: /images/thumbs/dgwafl.png
year: 2018
---


<div class="summary">
In this paper, the authors tackle the problem of <b>Domain Generalization</b>: Given multiple source domains, the goal is to learn a joint aligned feature representation, hoping it would generalize to a new <b>unseen target</b> domain. This is closely related to the <b>Domain Adaptation</b> task, with the difference that no target data (even unlabeled) is available at training time. Most approaches rely on the idea of aligning the source domains distributions in a shared space. In this work, the authors propose to additionally match the source distributions to a known <b>prior distribution</b>.
<ul>
<li><span class="procons">Pros (+):</span> Extension of <code>MMD</code>-matching techniques to <b>domain generalization</b>: No target data available, so instead align all domains to a <b>prior distribution</b></li>
<li><span class="procons">Cons (-):</span> Potentially lacking comparison to some baselines (deep, adversarial).</li>
</ul>
</div>


<h3 class="section proposed"> Proposed model: MMD-AAE</h3>

The goal of domain generalization is to find a common *domain-invariant feature space* underlying the source and (unseen) target spaces, under the assumption that such a space exists.
To learn such space, the authors propose a variant of <span class="citations">[1]</span>, whose goal is to minimize the variance between the different source domains distributions using *Maximum Mean Discrepancy*. Additionally, the source distributions are aligned with a fixed *prior distribution*, with the hope that this reduces the risk of overfitting to the seen domains.

#### Adversarial Auto-encoder
The proposed model, `MMD-AAE` (Maximum Mean Discrepancy Adversarial Auto-encoder) consists in an *encoder* $$Q: x \mapsto h$$, that maps inputs to latent codes, and a decoder $$P: h \mapsto x$$. These are equipped with a standard autoencoding loss to make the model learn meaningful embeddings

$$
\begin{align}
\mathcal{L}_{\text{AE}}(x) = \| P(Q(x)) - x \|^2 \tag{autoencoder loss}
\end{align}
$$

Based on the `AAE` framework <span class="citations">[1]</span>, we also want the learned latent codes to match a certain *prior* distribution, $$p(h)$$ (In practice, a Laplace distribution). This is done by introducing a `GAN` (Generative Adversarial Networks) loss term on the generated embeddings, with the prior as the true, target, distribution. Introducing $$D$$, a discriminator with binary outputs, we have:

$$
\begin{align}
\mathcal{L}_{\text{GAN}}(x) = \mathbb{E}_{h \sim p(h)}(\log D(h)) + \mathbb{E}_{x \sim p(x)}(\log(1 - D(Q(x)))) \tag{GAN loss}
\end{align}
$$

#### MMD Regularization
On top of the `AAE` objective, the authors propose to regularize the feature space using `MMD`, extended to the multi-domain setting. They key idea of the maximum mean discrepancy (`MMD`) is to compare two distributions $$\mathcal P$$ and $$\mathcal Q$$ using their *mean statistics* rather than density estimators:

$$
\begin{align}
\text{MMD}(\mathcal P, \mathcal Q; \mathcal{F}) = \sup_{f \in \mathcal F} \left( \mathbb{E}_{x \sim \mathcal P} (f(x)) - \mathbb{E}_{y \sim \mathcal Q} (f(y))  \right)
\end{align}
$$

A classical choice is to take $$\mathcal F$$ as the space of linear functions and to leverage the *kernel trick* on a reproducing kernel Hilbert space to efficiently compute the difference of means

$$
\begin{align}
f: \ x &\mapsto \phi(x) \cdot w_{f} \tag{evaluation function}\\
\exists k,\ f(x) &= \sum_y f(y) k(x, y) = <f, k(x, \cdot) > \tag{reproducing kernel}\\
k(x, y) &= < \phi(x), \phi(y) >
\end{align}
$$

$$
\begin{align}
\mathbb{E}_{x \sim \mathcal P} (f(x))  &= <f, \mathbb{E}_{x \sim \mathcal P}\ k(x, \cdot)> \overset{\Delta}{=}\ <f, \mathbf{\mu_{\mathcal P}} >\\
\text{MMD}(\mathcal P, \mathcal Q; \mathcal F) &= \sup_{f \in \mathcal F} < f, \mu_{\mathcal P} - \mu_{\mathcal Q} > = \| \mu_{\mathcal P} - \mu_{\mathcal Q} \|
\end{align}
$$


Following <span class="citations">[2]</span>, the authors extend this metric for multiple domains. First, we define the *distributional variance* to measure the dissimilarity across domains using a mean map operator, computed via the distribution over all domains, $$\bar{\mathcal P}$$.

$$
\begin{align}
\sigma (\mathcal{P}_1, \dots, \mathcal{P}_K) = \frac{1}{K} \sum_{i=1}^K ||\mu_{\mathcal{P}_i} - \mu_{\bar{\mathcal P}} \|
\end{align}
$$

which is 0 if and only if all the domain distributions are equal. Finally, this quantity is hard to compute but can be upper-bounded by a sum of pairwise `MMD`s:

$$
\begin{align}
\mathcal{L}_{\text{MMD}}  = \frac{1}{K^2} \sum_{1 \leq i, j \leq K} \text{MMD}(\mathcal{P}_i, \mathcal{P}_j) \tag{MMD loss}
\end{align}
$$

In practice, the MMD is computed under a specific kernel choice and approximating the expectations by their empirical estimates.

$$
\begin{align}
MMD(\mathcal{P}_i, \mathcal{P}_j)^2 &= \left\| \frac{1}{n_i} \sum_t \phi(x_{i, t})  -  \frac{1}{n_j} \sum_t \phi(x_{j, t}) \right \|^2\\
& = \frac{1}{n_i^2} \sum_{t, u} k(x_{i, t}, x_{i, u}) + \frac{1}{n_j^2} \sum_{t, u} k(x_{j, t}, x_{j, u}) - \frac{2}{n_i n_j} \sum_{t, u} k(x_{i, t}, x_{j, u})
\end{align}
$$

where $$k$$ is the kernel function associated to feature map $$\phi$$. Experiments are conducted with various Gaussian RBF priors.

#### Semi-supervised MMD-AAE

Finally, the model should learn a representation that is also adequate for the task at hand (here, classification). This is done by adding a *classifier* (two fully connected layers) on top of the representation minimizing a standard cross entropy loss term, $$\mathcal{L}_{\text{err}}$$ between the input image label and the model output.

---


<h3 class="section experiments"> Experiments </h3>

#### Implementation

The `MMD` functional space uses the `RBF` (Gaussian) kernel.
The final objective is the weighted sum of the four aforementioned loss terms ($$\mathcal{L}_{\text{AE}}, \mathcal{L}_{\text{GAN}}, \mathcal{L}_{\text{MMD}}$$ and $$\mathcal{L}_{\text{err}}$$).
The model is trained similarly to `GAN`s: The discriminator and generator (auto-encoder) parameters are updated in *two alternating optimization steps*.

#### Experiments

The method is evaluated on various classification tasks (digit, object and action recognition) in settings where the domains differ by small geometric changes (e.g., change of pose). They also compare to a large range of baselines, although none of them seem to have an adversarially learned representation space (maybe <span class="citations">[3]</span> would have been a good additional baseline).

Additionally, ablation experiments show that the three terms $$\mathcal{L}_{\text{GAN}}$$, $$\mathcal{L}_{\text{MMD}}$$ and $$\mathcal{L}_{\text{err}}$$ all have a positive effect on the final effect, even when taken individually.



---

<h3 class="section references"> References </h3>
* <span class="citations">[1]</span> Adversarial Autoencoders, <i>Makhzani et al., ICLR Workshop, 2016</i>
* <span class="citations">[2]</span> Domain Generalization via Invariant Feature Representation, <i>Muandet et al., ICML 2013</i>
* <span class="citations">[3]</span> Domain-Adversarial Training of Neural Networks, <i>Ganin et al., JMLR 2016</i>
