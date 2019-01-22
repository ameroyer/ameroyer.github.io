---
layout: post
title:  "Deep Visual Analogy"
date:   2019-01-22 18:00:00 +0200
tags: deep learning
categories: readingnotes
thumb: /images/thumbs/deepvisualanalogy.png
---


This post contains my reading notes about <span class="keyword">Deep Visual Analogies</span> as described in the paper <a href="https://arxiv.org/abs/1810.09136" target="_blank"><i>"Deep VIsual Analogy Making"</i></a>, from Reed et al. published in NeurIPS (NIPS) 2015.


In this paper, the authors propose to learn <span class="keyword">visual analogies</span> akin to the semantic and synctatic analogies emerging in the Word2Vec embedding <span class="citations">[1]</span>. In particular, they tackle the task of predicting the transformation of a source image under a certain analogy, inferred from another given (source, target) pair.

 * <span class="keyword">Pros (+):</span> Very intuitive, Introduces two datasets for the visual analogy task.
 * <span class="keyword">Cons (-):</span> Only consider "local" scenarios, i.e. geometric transformations or single attributes, and very clean images (no background).

<div style='width:50%; text-align:center; margin-left:auto; margin-right: auto'>
<img src="/images/readingnotes/deepvisualanalogy_intro.png">
<br><b>Figure 1:</b> Visual analogy making concept. We learn an encoder function mapping images into a space in which analogies can be performed, and a decoder mapping back to the image space.
</div>


### <i class="fa fa-edit"></i> Visual analogies

**Definition.** A visual analogy is denoted by "**a:b :: c:d**", meaning that the entity **a** is to **b** what the entity **c** is to **d**. In particular , this paper focuses on the problem of generating image **d** given the relation **a:b** and a source image **c**.

They propose to use an encoder-decoder based model for generation, and to learn to make analogy with <span class="keyword">simple transformations of the latent space</span>, for instance addition or multiplication between vectors, as was the case in words embeddings such as GloVe <span class="citations">[2]</span> or Word2Vec <span class="citations">[1]</span>.


#### Learning to generate analogies via manipulation of the embedding space
**Additive objective.** Let $$f$$ be an encoder and $$g$$ the decoder. The first, most straightforward loss objective they propose is to learn analogy by addition in the latent space, in other words using the objective

\begin{align}
\mathcal L_{\mbox{add}} = |d - g \left(f(b) - f(a) + f(c) \right)|
\end{align}

One disadvantage of this purely linear transformation is that it cannot learn complex structures, for instance periodic transformations: If $$f(b) - f(a)$$ is a rotation, the decoded image (and embedding) should eventually comes back to $$f(a)$$ which is not possible when adding a non-zero vector. To capture more complex transformations, the authors introduce two variants of the previous objective.

**Multiplicative objective.**

\begin{align}
\mathcal L_{\mbox{mult}} = |d - g \left( W \odot [f(b) - f(a)] \odot  f(c) \right)|
\end{align}

where $$W \in \mathbb{R}^{K\times K\times K}$$ and the three-way multiplication operator is defined as $$(A \odot B \odot C)_k = \sum_{i, j} A_{ijk} B_i C_j$$

**Deep objective.**
\begin{align}
\mathcal L_{\mbox{deep}} = |d - g \left( \mbox{MLP}([ f(b) - f(a),  f(c)]) \right)|
\end{align}

where $$\mbox{MLP}$$ designates a Multi Layer Perceptron.


 **Regularizer.** While the previous losses acted at the pixel-level between the decoded image and the target image **D**, the authors introduce an additional regularization loss that additionally matches the analogy between those two images ***at the feature level*** with the source analogy **a:b**:

 \begin{align}
 R = |(f(d) - f(c)) -  T(f(b) - f(a), f(c))|
 \end{align}

 Where $$T$$ is defined accordingly to match the chosen embedding, $$\mathcal L_{\mbox{add}}$$, $$\mathcal L_{\mbox{mult}}$$ or $$\mathcal L_{\mbox{deep}}$$. For intance, $$T: (x, y) \mapsto x$$ in the additive variant.

<div style='width:75%; text-align:center; margin-left:auto; margin-right: auto'>
<img src="/images/readingnotes/deepvisualanalogy_model.png">
<br><b>Figure 2:</b> Illustration of the network structure for analogy making. The top portion shows the encoder, transformation module, and decoder. The bottom portion illustrates the transformations used for each of the different embedding combination object (additive, multiplicative or deep).
</div>


#### Disentangling the feature space
The authors consider another solution to the visual analogy problem which aims to learn a <span class="keyword">disentangled feature space</span> that can be freely manipulated by selecting appropriate latent variables, rather than specific operation.

In that setting, the problem is slightly different, as we require additional supervision to control the different factors of variation. It can be denoted as **(a, b):s :: c**, which means: given two input images **a** and **b**, and a switch vector **s** controlling the latent space, retrieve image **c** which matches the features of **a** according to the pattern of **s**, and features of **b** on remaining latent variables.

Let us denote by $$S$$ the number of possible axes of variations (e.g., change in illumination, elevation, rotation etc) then $$s \in \{0, 1\}^S$$ is a one-hot block vector encoding the current transformation, called the <span class="keyword">switch vector</span>. The disentangling objective is thus

 \begin{align}
 \mathcal{L}_{\mbox{dis}} = |c - g(f(a) \times + f(b) \times (1 - s))|
 \end{align}

 In other words the decoder tries to match **c**  by decoding separate information from **a** and **b**. Contrary to the previous objectives, only three images are needed, but it also requires extra supervision in the form of a switch vector **s** which can be hard to obtain in practice.


### <i class="fa fa-wrench"></i>  Experiments

 The authors consider three main experimental settings:
  * <span class="keyword">Synthetic experiments on geometric shapes.</span> The dataset consists in 48 × 48 images scaled to [0, 1] with 4 shapes, 8 colors, 4 scales, 5 row and column positions, and 24 rotation angles. No disentangling training was performed in this setting.
  * <span class="keyword">Sprites dataset.</span> The dataset consists of 60 × 60 color images of sprites scaled to [0, 1], with 7 attributes and 672 total unique characters. For each character, there are 5 animations each from 4 viewpoints. In that setting, they test two disentanglement methods:`dist`, where they only try to separate the pose from identity (collection of all attributes), and `dist+cls`, where they actually split the latent variables by attribute.
  * <span class="keyword">3D Cars.</span> For each of the 199 car models, the dataset contains 64 × 64 color renderings from 24 rotation angles each offset by 15 degrees.

The authors report results in terms of <span class="keyword">pixel prediction error</span>. Out of the three manipulation method, $$\mathcal{L}_{\mbox deep}$$ usually performs best. However qualitative samples show that $$\mathcal L_{\mbox{add}}$$ and $$\mathcal L_{\mbox{mult}}$$ both also perform well visually, although they fail for the case of rotation in the first set of experiments, which justifies the use of more complex training objectives.

Disentanglement methods usually outperforms the other baselines, especially in <span class="keyword">few-shots experiments</span>. In particular the `dist+cls` (disentanglement with attributes) method usually wins by a large margin, which shows that the additional supervision really helps in learning a structured representation. However such supervisory signal sounds hard to obtain in practice in more generic scenarios.

 <center><img src='/images/readingnotes/deepvisualanalogy_datasets.png'>
  <br>
  <b>Figure:</b> Examples of samples from the three visual analogy datasets considered in experiments</center>


 ### References

   * <span class="citations">[1]</span> Distributed representations of words and phrases and their compositionality, Mikolov et al., NIPS 2013
   * <span class="citations">[2]</span> GloVe: Global Vectors for Word Representation, Pennington et al., EMNLP 2014