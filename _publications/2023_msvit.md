---
title: "MSViT: Dynamic Mixed-Scale Tokenization for Vision Transformers"
collection: publications
relid: iccvw-2023-msvit
paperurl: 'https://arxiv.org/abs/2307.02321'
repository: 'https://github.com/Qualcomm-AI-research/batchshaping'
slides: 'https://www.youtube.com/watch?v=1H7LJ7-v58w'
poster: '/files/posters/msvit_poster.pdf'
year: 2023
selected: true
authors: 'Jakob Drachmann Havtorn*, <span class="first_author">Amélie Royer</span>*, Tijmen Blankevoort, Babak Ehteshami Bejnordi'
venue: 'ICCV Workshop on New Ideas in Vision Transformers (NViT)'
teaser: 'thumbs/pub/msvit_thumb.png'
bibtex: |
  @InProceedings{Havtorn_2023_ICCVW,
  <br>&nbsp;&nbsp;&nbsp;&nbsp;author    = {Havtorn, Jakob and Royer, Am\'elie and Blankevoort, Tijmen and Ehteshami Bejnordi, Babak},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;title     = {MSViT: Dynamic Mixed-Scale Tokenization for Vision Transformers},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;booktitle = {ICCV Workshop on New Ideas in Vision Transformers (NViT)},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;year      = {2023}
  <br>}
---

The input tokens to Vision Transformers carry little semantic meaning as they are defined as regular equal-sized patches of the input image, regardless of its content. However, processing uniform background areas of an image should not necessitate as much compute as dense, cluttered areas. To address this issue, we propose a dynamic mixed-scale tokenization scheme for ViT, MSViT. Our method introduces a conditional gating mechanism that selects the optimal token scale for every image region, such that the number of tokens is dynamically determined per input. In addition, to enhance the conditional behavior of the gate during training, we introduce a novel generalization of the batch-shaping loss. We show that our gating module is able to learn meaningful semantics despite operating locally at the coarse patch-level. The proposed gating module is lightweight, agnostic to the choice of transformer backbone, and trained within a few epochs with little training overhead. Furthermore, in contrast to token pruning, MSViT does not lose information about the input, thus can be readily applied for dense tasks. We validate MSViT on the tasks of classification and segmentation where it leads to improved accuracy-complexity trade-off. 
