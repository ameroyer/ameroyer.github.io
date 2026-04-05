---
title: "Audio Word Similarity for Clustering with zero Resources based on iterative HMM Classification"
paperurl: 'https://hal-imt.archives-ouvertes.fr/hal-01336100/'
year: 2016
selected: false
authors: '<span class="first_author">Amélie Royer</span>, Guillaume Gravier, Vincent Claveau'
venue: 'International Conference on Acoustics, Speech and Signal Processing (ICASSP)'
teaser: 'thumbs/pub/sic_thumb.png'
bibtex: |
  @InProceedings{Royer_2016_ICAPS,
    author = {Royer, Amélie, Gravier, Guillaume and Claveau, Vincent},
    title = {Audio word similarity for clustering with zero resources based on iterative HMM classification},
    booktitle = {International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
    month = {March},
    year = {2016}
  }
---

Recent work on zero resource word discovery makes intensive use of audio fragment clustering to find repeating speech patterns. In the absence of acoustic models, the clustering step traditionally relies on dynamic time warping (DTW) to compare two samples and thus suffers from the known limitations of this technique.

We propose a new sample comparison method, called 'similarity by iterative classification', that exploits the modeling capacities of hidden Markov models (HMM) with no supervision. The core idea relies on the use of HMMs trained on randomly labeled data and exploits the fact that similar samples are more likely to be classified together by a large number of random classifiers than dissimilar ones.

The resulting similarity measure is compared to DTW on two tasks, namely nearest neighbor retrieval and clustering, showing that the generalization capabilities of probabilistic machine learning significantly benefit to audio word comparison and overcome many of the limitations of DTW-based comparison.
