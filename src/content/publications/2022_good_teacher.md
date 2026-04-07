---
title: "Knowledge Distillation: A good teacher is patient and consistent"
paperurl: "https://arxiv.org/abs/2106.05237"
year: 2022
selected: false
authors: 'Lucas Beyer*, Xiaohua Zhai*, <span class="first_author">Amélie Royer</span>*, Larisa Markeeva*, Rohan Anil, Alexander Kolesnikov'
venue: "Conference on Computer Vision and Pattern Recognition (CVPR) (oral)"
teaser: "thumbs/pub/distill_thumb.png"
bibtex: |
  @InProceedings{Beyer_2022_CVPR,
    author    = {Beyer, Lucas and Zhai, Xiaohua and Royer, Amélie and Markeeva, Larisa and Anil, Rohan and Kolesnikov, Alexander},
    title     = {Knowledge Distillation: A Good Teacher Is Patient and Consistent},
    booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
    year      = {2022}
  }
---

There is a growing discrepancy in computer vision between large-scale models that achieve state-of-the-art performance and models that are affordable in practical applications. In this paper we address this issue and significantly bridge the gap between these two types of models. Throughout our empirical investigation we do not aim to necessarily propose a new method, but strive to identify a robust and effective recipe for making state-of-the-art large scale models affordable in practice. We demonstrate that, when performed correctly, knowledge distillation can be a powerful tool for reducing the size of large models without compromising their performance. In particular, we uncover that there are certain implicit design choices, which may drastically affect the effectiveness of distillation. Our key contribution is the explicit identification of these design choices, which were not previously articulated in the literature. We back up our findings by a comprehensive empirical study, demonstrate compelling results on a wide range of vision datasets and, in particular, obtain a state-of-the-art ResNet-50 model for ImageNet, which achieves 82.8% top-1 accuracy.
