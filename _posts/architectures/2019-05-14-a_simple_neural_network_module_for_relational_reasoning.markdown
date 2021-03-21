---
layout: post
title:  "A simple Neural Network Module for Relational Reasoning"
date:   2019-05-14 08:59:24 +0200
tags: [architectures, neurips, 2017]
categories:  [Architectures]
author: Santoro et al, NeurIPS 2017, <a href='https://arxiv.org/abs/1706.01427' target='_blank'>[link]</a>
thumb: /images/thumbs/asnnmfrr.png
year: 2017
---


<div class="summary">

The authors propose a <b>relation module</b> to equip <code>CNN</code> architectures with notion of relational reasoning, particularly useful for tasks such as visual question answering, dynamics understanding etc.
<ul>
<li><span class="procons">Pros (+):</span> Simple architecture, relies on small and flexible modules.</li>
<li><span class="procons">Cons (-):</span>  Still a black-box module, hard to quantify how much "reasoning" happens.</li>
</ul>
</div>


<h3 class="section proposed"> Proposed Model</h3>

The main idea of *Relation Networks* (`RN`) is to constrain the functional form of convolutional neural networks as to explicitly learn relations between entities, rather than hoping for this property to emerge in the representation during training. Formally, let $$O$$ be a set of objects of interest $$O = \{o_1 \dots o_n\}$$; The Relation Network is trained to learn a representation that considers all *pairwise relations* across the objects:

$$
\begin{align}
\mbox{RN}(O) =  f_{\phi}& \left(\sum_{i, j} g_{\theta}(o_i, o_j) \right)
\end{align}
$$

$$f_{\phi}$$ and $$g_{\theta}$$ are defined as *Multi Layer Perceptrons*. By definition, the Relation Network ***(i)*** has to consider all pairs of objects, ***(ii)*** operates directly on the set of objects hence is not constrained to a specific organization of the data, and ***(iii)*** is data-efficient in the sense that only one function, $$g_{\theta}$$ is learned to capture all the possible relations: $$g$$ and $$f$$ are typically light modules and most of the overhead comes from the sum of pairwise components ($$n^2$$).

The *objects* are the basic elements of the relational process we want to model. They are defined with regard to the task at hand, for instance:
  * **Attending relations between objects in an image**: The image is first processed through a fully-convolutional network. Each of the resulting cell is taken as an object, which is a  feature of dimensions $$k$$, additionally tagged with its position in the feature map.

  * **Sequence of images.** In that case, each image is first fed through a feature extractor and the resulting embedding is used as an object. The goal is to model relations between images across the sequence.


<div class="figure">
<img src="{{ site.baseurl }}/images/posts/relation_network.png">
<p><b>Figure:</b> Example of applying the Relation Network for <b>Visual Question Answeting</b>. Questions are processed with an <code>LSTM</code> to produce a question embedding, and images are processed with a <code>CNN</code> to produce a set of objects for the <code>RN</code>.</p>
</div>


---

<h3 class="section experiments"> Experiments </h3>
The main evaluation is done on the `CLEVR` dataset <span class="citations">[2]</span>.  The main message seems to be that the proposed module  is very simple and yet often improves the model accuracy when added to various architectures (`CNN`, `CNN + LSTM` etc.) introduced in <span class="citations">[1]</span>. The main baseline they compare to (and outperform) is *Spatial Attention* (`SA`) which is another simple method to integrate some form of relational reasoning in a neural architecture.

  ---

 <h3 class="section followup">Closely related</h3>


<h4 style="margin-bottom: 0px"> Recurrent Relational Neural Networks <span class="citations">[3]</span></h4>
<p style="text-align: left">Palm et al, <a href="https://arxiv.org/pdf/1711.08028.pdf">[link]</a></p>

> This paper builds on the Relation Network architecture and propose to explore  *more complex relational structures*,  defined as a graph, using a *message passing* approach: Formally, we are given a graph with vertices $$\mathcal V = \{v_i\}$$ and edges $$\mathcal E = \{e_{i, j}\}$$. By abuse of notation, $$v_i$$ also denotes the embedding for vertex $$i$$ (e.g. obtained via a CNN) and $$e_{i, j}$$  is 1 where  $$i$$ and $$j$$ are linked, 0 otherwise. To each node we associate a *hidden state* $$h_i^t$$ at iteration $$t$$, which will be updated via message passing. After a few iterations, the resulting state is passed through a `MLP`  $$r$$ to output the result (either for each node or for the whole graph):

  $$
  \begin{align}
  h_i^0 &= v_i\\
  h_i^{t + 1} &= f_{\phi} \left( h_i^t, v_i, \sum_{j} e_{i, j} g_{\theta}(h^t_i, h^t_j) \right)\\
  o_i &= r(h_i^T) \mbox{ or } o = r(\sum_i h_i^T)
  \end{align}
  $$

>  Comparing to the original Relation Network:
  * Each update rule is a Relation Network that only looks at *pairwise relations between linked vertices*. The message passing scheme additionally introduces the notion of recurrence, and the dependency on the previous hidden state.
  * The dependence on $$h_i^t$$ could *in theory* be avoided by adding self-edges from $$v_i$$ to $$v_i$$, to make it closer to the Relation Network formulation.
  * Adding $$v_i$$ as input of $$f_\phi$$ looks like a simple trick  to avoid long-term memory problems.


> The *experiments* essentially compare the proposed `RRNN` model to the Relation Network and  classical recurrent architectures such as `LSTM`. They consider three datasets:
   * **Babi.** NLP question answering task with some reasoning involved. Solves 19.7 (out of 20) tasks on average, while simple RN solved around 18 of them reliably.
   * **Pretty CLEVR.** A CLEVR like dataset (only with simple 2D shapes) with questions involving various steps of reasoning, e.g. "which is the shape $$n$$ steps of the red circle ?"
   * **Sudoku.** the graph contains 81 nodes (one for each cell in the sudoku), with edges between cells belonging to the same row, column or block.



<h4 style="margin-bottom: 0px; margin-top:50px"> Multi-Layer Relation Neural Networks <span class="citations">[4]</span></h4>
<p style="text-align: left">Jahrens and Martinetz, <a href="https://arxiv.org/pdf/1811.01838.pdf">[link]</a></p>

> This paper presents a very simple trick to make Relation Network consider higher order relations than pairwise, while retaining some efficiency. Essentially the model can be written as follow:

$$
\begin{align}
h_{i, j}^0 &= g^0_{\theta}(x_i, x_j) \\
h_{i, j}^t &= g^{t + 1}_{\theta}\left(\sum_k h_{i, k}^{t - 1}, \sum_k h_{j, k}^{t - 1}\right) \\
MLRN(O) &= f_{\phi}(\sum_{i, j} h^T_{i, j})
\end{align}
$$

> It is not clear while this model would be equivalent to explicitly considering higher-level relations (as it is rather  combining pairwise terms for a *finite number of steps*). According to the experiments it seems that indeed this architecture could be better fitted for the studied tasks (e.g. over  the Relation Network or Recurrent Relation Network) but it also makes the model even harder to interpret.

---

<h3 class="section references">References</h3>
* <span class="citations">[1]</span> Inferring and executing programs for visual reasoning, <i>Johnson et al, ICCV 2017</i>
* <span class="citations">[2]</span> CLEVR: A Diagnostic Dataset for Compositional Language and Elementary Visual Reasoning, <i>Johnson et al, CVPR 1017</i>
* <span class="citations">[3]</span> Recurrent Relational Neural Networks, <i>Palm et al, NeurIPS 2018</i>
* <span class="citations">[4]</span> Multi-Layer Relation Neural Networks, <i>Jahrens et Martinetz, arXiv 2018</i>
