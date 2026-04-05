---
title: "A Style-Based Generator Architecture for Generative Adversarial Networks"
date: 2021-01-14
tags: [generative models]
categories: [Generative Models]
author: "Karras et al."
venue: CVPR
paperurl: 'https://arxiv.org/abs/1812.04948'
thumb: /images/thumbs/notes/todo.png
year: 2019
---

<div class="summary">
  In this work, the authors propose <code>StyleGAN</code>, a novel generator architecture for Generative Adversarial Networks that disentangles high-level attributes (such as pose and identity when trained on human faces) from stochastic variation (such as freckles, hair) in the generated images. The architecture is based on mapping the latent code through a mapping network before injecting style at different scales.

  <ul>
    <li><span class="pros">Pros (+):</span> State-of-the-art image quality, disentangled latent space with nice interpolation properties.</li>
    <li><span class="cons">Cons (-):</span> High computational cost, complex architecture with many hyperparameters.</li>
  </ul>
</div>
