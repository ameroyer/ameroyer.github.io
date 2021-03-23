---
title: "A Flexible Selection Scheme for Minimum-Effort Transfer Learning"
collection: publications
relid: 2020-wacv-flextuning
paperurl: 'http://openaccess.thecvf.com/content_WACV_2020/papers/Royer_A_Flexible_Selection_Scheme_for_Minimum-Effort_Transfer_Learning_WACV_2020_paper.pdf'
repository: 'https://github.com/ameroyer/Flextuning'
slides: '/files/slides/[2020]WACV-Flextuning.pdf'
poster: '/files/posters/poster_flextuning.pdf'
year: 2020
authors: '<span class="first_author">Amélie Royer</span> and Christoph Lampert'
venue: 'Winter Conference on Applications of Computer Vision (WACV)'
teaser: 'thumbs/pub/flextuning_thumb.png'
bibtex: |
  @InProceedings{Royer_2020_odgi,
  <br>&nbsp;&nbsp;&nbsp;&nbsp;author = {Royer, Am\'{e}lie and Lampert, Christoph H.},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;title = {A Flexible Selection Scheme for Minimum-Effort Transfer Learning},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;booktitle = {Winter Conference on Applications of Computer Vision (WACV)},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;year = {2020}
  <br>}
---

Fine-tuning is a popular way of exploiting knowledge contained in a pre-trained convolutional network for a new visual recognition task. However, the orthogonal setting of transferring knowledge from a pretrained network to a vi- sually different yet semantically close source is rarely considered: This commonly happens with real-life data, which is not necessarily as clean as the training source (noise, geometric transformations, different modalities, etc.).

To tackle such scenarios, we introduce a new, generalized form of fine-tuning, called flex-tuning, in which any individual unit (e.g. layer) of a network can be tuned, and the most promising one is chosen automatically. In order to make the method appealing for practical use, we propose two lightweight and faster selection procedures that prove to be good approximations in practice. We study these selection criteria empirically across a variety of domain shifts and data scarcity scenarios, and show that fine-tuning individual units, despite its simplicity, yields very good results as an adaptation technique. As it turns out, in contrast to common practice, rather than the last fully-connected unit it is best to tune an intermediate or early one in many domain shift scenarios, which is accurately detected by flex-tuning.
