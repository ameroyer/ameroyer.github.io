---
layout: post
title:  "From Red Wine to Red Tomato: Composition with Context"
date:   2019-04-29 10:59:24 +0200
tags: [few-shot learning, cvpr, 2017]
categories:  [Few-Shot Learning]
author: Misra et al, CVPR 2017, <a href='http://openaccess.thecvf.com/content_cvpr_2017/papers/Misra_From_Red_Wine_CVPR_2017_paper.pdf' target='_blank'>[link]</a>
thumb: /images/thumbs/frwtrt.png
year: 2017
---



<div class="summary">
In this paper, the authors tackle the problem of learning classifiers of visual concepts that can also adapt to new concept compositions at test time. The main difficulty is that visual concept can different depending on the <b>context</b>, i.e., depending on the concepts they are combined with. For instance the red in "<span style="color: tomato">red tomato</span>" is different from the one in "<span style="color:darkred">red wine</span>". This work emphasizes the notion of visual concepts as composition units, rather than the usual paradigm of directly learning from large exhaustive datasets.
<ul>
<li><span class="procons">Pros (+):</span> Purely visual (no extra linguistic/semantic source).</li>
<li><span class="procons">Cons (-):</span> Results are only reported on unseen combinations, hard to judge the base performance of the model.</li>
</ul>
</div>


<h3 class="section proposed"> Proposed model</h3>
The main idea of the proposed method is to learn how to composite visual concepts (here: object categories and attributes) at the *feature-level*. Each visual concept $$c$$ is represented by a linear classifier $$\phi_c: x \mapsto\ x \cdot w_c$$ that has been trained to recognize it. The model then learns to compose such linear classifier by feeding them to a *Transformation Network*, $$T$$, which in turn outputs another classifier, which should capture the composition of the two input concepts.

<div class="figure">
<img src="{{ site.baseurl }}/images/posts/composition_with_context.png">
<p><b>Figure:</b>  Overview of the Transformation Network. At training time, we assume access to a limited set of combinations of the primitives, each modeled by a linear classifier. The transformation network takes these classifiers as input and composes them to produce a classifier for their combination.</p>
</div>

The input concepts are split in two categories (e.g., objects and attributes) which can be combined. For each of them, a *linear binary classifier* (SVM) is trained to detect the concept, based on some pre-trained feature extractor $$\phi$$.  The goal is to learn the composition operation, which could be applied to even new combinations of the concepts, unseen during training.
$$T$$ is parametrized as a *3 layer Multi-Layer Perceptron* and trained with the following loss:

$$
\begin{align}
\mathcal{L}(x, a, b) = \ell(\text{sigmoid} ( T(w_a, w_b) \cdot \phi(x)), y)
\end{align}
$$

where $$\ell$$ is a standard binary classification loss (here, cross-entropy). $$y$$ is the label of the image $$x$$ for the considered task and should be 1 if and only if the image contains the complex context $$(a, b)$$.


---

<h3 class="section experiments"> Experiments </h3>

The feature extractor used in the experiments is a `VGG-M-1024` network *pretrained on ImageNet*. It is kept fixed and not re-trained, only the Transformation Network and linear classifiers are. Experiments are performed on the *MITStates* dataset and evaluated in terms of predicting (top-k accuracy and mAP) the presence or absence of unseen combinations of (object, attribute) pairs. The model is compared against the following baselines, using the same pre-trained backbone feature extractor:

  * **Individual:** Only uses one of the modalities, e.g., $$p(ab) = \max(p(a), p(b))$$.
  * **Visual product:** Classify complex concepts under independence assumption, $$p(ab) = p(a) p(b)$$.
  * **Label Embeddings:** <span class="citations">[1, 2]</span> The transformation network is learned on *word embeddings* of the visual concepts as inputs.



Interestingly the **Individual-Obj** baseline that considers only the object category performs quite well in terms of average precision. This suggest the object category is more significant than the attribute prediction. Finally, the proposed model outperforms the baselines but still produces poor overall performance in terms of classification accuracy, so *it is not clear how much is really due to generalization to new concept combinations*. Ablation and qualitative experiments do show that the model learns some meaningful information about composition, however the gain seems to depend a lot on the actual object and attribute combined.

---

<h3 class="section references"> References </h3>
  * <span class="citations">[1]</span> Predicting Deep Zero-shot Convolutional Neural Networks using Textual Descriptions, <i>Ba et al, CVPR, 2015</i>
  * <span class="citations">[2]</span> Zero-Shot Learning using purely Textual Descriptions, <i>Everingham et al, ICCV 2013</i>
