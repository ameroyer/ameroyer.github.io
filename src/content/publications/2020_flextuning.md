---
title: "A Flexible Selection Scheme for Minimum-Effort Transfer Learning"
paperurl: "http://openaccess.thecvf.com/content_WACV_2020/papers/Royer_A_Flexible_Selection_Scheme_for_Minimum-Effort_Transfer_Learning_WACV_2020_paper.pdf"
slides: "/files/slides/[2020]WACV-Flextuning.pdf"
poster: "/files/posters/poster_flextuning.pdf"
year: 2020
selected: false
authors: '<span class="first_author">Amélie Royer</span> and Christoph Lampert'
venue: "Winter Conference on Applications of Computer Vision (WACV)"
code: "https://github.com/ameroyer/Flextuning"
teaser: "thumbs/pub/flextuning_thumb.png"
bibtex: |
  @InProceedings{Royer_2020_Flextuning,
    author = {Royer, Amélie and Lampert, Christoph H.},
    title = {A Flexible Selection Scheme for Minimum-Effort Transfer Learning},
    booktitle = {Winter Conference on Applications of Computer Vision (WACV)},
    year = {2020}
  }
---

Fine-tuning is a popular way of exploiting knowledge contained in a pre-trained convolutional network for a new visual recognition task. However, the orthogonal setting of transferring knowledge from a pretrained network to a visually different yet semantically close source is rarely considered: This commonly happens with real-life data, which is not necessarily as clean as the training source (noise, geometric transformations, different modalities, etc.).

To tackle such scenarios, we introduce a new, generalized form of fine-tuning, called flex-tuning, in which any individual unit (e.g. layer) of a network can be tuned, and the most promising one is chosen automatically. In order to make the method appealing for practical use, we propose two lightweight and faster selection procedures that prove to be good approximations in practice. We study these selection criteria empirically across a variety of domain shifts and data scarcity scenarios, and show that fine-tuning individual units, despite its simplicity, yields very good results as an adaptation technique. As it turns out, in contrast to common practice, rather than the last fully-connected unit it is best to tune an intermediate or early one in many domain shift scenarios, which is accurately detected by flex-tuning.
