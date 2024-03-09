---
title: "Scalarization for Multi-Task and Multi-Domain Learning at Scale"
collection: publications
relid: neurips-2023-
paperurl: 'https://arxiv.org/abs/2310.08910'
slides: 'https://neurips.cc/virtual/2023/poster/71557'
poster: '/files/posters/neurips2023.png'
year: 2023
selected: true
authors: '<span class="first_author">Amélie Royer</span>, Tijmen Blankevoort, Babak Ehteshami Bejnordi'
venue: 'Conference on Neural Information Processing Systems (NeurIPS)'
teaser: 'thumbs/pub/pbt_thumb.png'
bibtex: |
  @InProceedings{Royer_2023_NEURIPS,
  <br>&nbsp;&nbsp;&nbsp;&nbsp;author    = {Royer, Am\'elie and Blankevoort, Tijmen and Ehteshami Bejnordi, Babak},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;title     = {Knowledge Distillation: A Good Teacher Is Patient and Consistent},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;booktitle = {Conference on Neural Information Processing Systems (NeurIPS)},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;year      = {2023}
  <br>}
---

Training a single model on multiple input domains and/or output tasks allows for compressing information from multiple sources into a unified backbone hence improves model efficiency. It also enables potential positive knowledge transfer across tasks/domains, leading to improved accuracy and data-efficient training. However, optimizing such networks is a challenge, in particular due to discrepancies between the different tasks or domains: Despite several hypotheses and solutions proposed over the years, recent work has shown that uniform scalarization training, i.e., simply minimizing the average of the task losses, yields on-par performance with more costly SotA optimization methods. This raises the issue of how well we understand the training dynamics of multi-task and multi-domain networks. In this work, we first devise a large-scale unified analysis of multi-domain and multi-task learning to better understand the dynamics of scalarization across varied task/domain combinations and model sizes. Following these insights, we then propose to leverage population-based training to efficiently search for the optimal scalarization weights when dealing with a large number of tasks or domains.