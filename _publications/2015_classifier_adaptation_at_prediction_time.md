---
title: "Classifier Adaptation at Prediction Time"
collection: publications
relid: 2015-cvpr
paperurl: 'http://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Royer_Classifier_Adaptation_at_2015_CVPR_paper.pdf'
repository: 'files/code/Classifier_Adaptation_At_Prediction_Time_src.zip'
poster: 'files/posters/2015_cvpr.pdf'
year: 2015
selected: true
authors: '<span class="first_author">Amélie Royer</span> and Christoph Lampert'
venue: 'Conference on Computer Vision and Pattern Recognition (CVPR)'
teaser: 'thumbs/pub/Stage_2014_thumb.jpg'
bibtex: |
  @InProceedings{Royer_2015_CVPR,
  <br>&nbsp;&nbsp;&nbsp;&nbsp;author = {Royer, Am\'{e}lie and Lampert, Christoph H.},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;title = {Classifier Adaptation at Prediction Time},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;booktitle = {Conference on Computer Vision and Pattern Recognition (CVPR)},
  <br>&nbsp;&nbsp;&nbsp;&nbsp;year = {2015}
  <br>}
---

Classifiers for object categorization are usually evaluated by their accuracy on a set of i.i.d. test examples. This provides us with an estimate of the expected error when applying the classifiers to a single new image. In real application, however, classifiers are rarely only used for a single image and then discarded. Instead, they are applied sequentially to many images, and these are typically not i.i.d. samples from a fixed data distribution, but they carry dependencies and their class distribution varies over time.

In this work, we argue that the phenomenon of correlated data at prediction time is not a nuisance, but a blessing in disguise. We describe a probabilistic method for adapting classifiers at prediction time without having to retraining them. We also introduce a framework for creating realistically distributed image sequences, which offers a way to benchmark classifier adaptation methods, such as the one we propose.

Experiments on the ILSVRC2010 and ILSVRC2012 datasets show that adapting object classification systems at prediction time can significantly reduce their error rate, even with additional human feedback.
