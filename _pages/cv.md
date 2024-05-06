---
layout: archive
css: cv
title: "Resume"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<h1 class="page__title"><a href="/files/Royer_Amelie_CV.pdf" title="Download as PDF" target="_blank"><i class="fas fa-file-pdf fa-lg"></i></a> Resume
</h1>


## <i class="fas fa-briefcase"></i> Work

| 2024 - today | **Deep Learning Research Engineer** <br> Kyutai Labs <br> 🇫🇷  *Paris, France*   |
|---|---|
| 2021 - 2024 | **Deep Learning Research Engineer** <br> Qualcomm AI Research <br> 🇳🇱  *Amsterdam, The Netherlands*   |
| &nbsp;  | &nbsp;  |





## <i class="fa fa-graduation-cap"></i> Education

| 2015 - 2020   | **PhD student at [ISTA](https://ist.ac.at)** <br> *Institute of Science and Technology Austria, Klosterneuburg, Austria*  |
|---|---|
| 2012 - 2015  | **Masters and Bachelors in Computer science at Ecole Normale Superieure (ENS) de Rennes** <br> In conjunction with studies at Irisa / University of Rennes 1, *Rennes, France* |
| 2010 - 2012  |  **Classes Préparatoires aux Grandes Écoles (CPGE)** <br> *Lycée Georges Clémenceau, Reims, France, MPSI-MP* * |


## <i class="fas fa-briefcase"></i> Internships


| 2020  | ![2020_internship_thumb](/images/thumbs/pub/Stage_2015_thumb.png) | [**Research internship at Google Brain Zürich**](https://arxiv.org/abs/2106.05237) <br> 🇨🇭  *5 months, Zürich, Switzerland*  <br> <u>Topic:</u> Working on large neural networks compression via knowledge distillation, advised by *Lucas Beyer* and *Alexander Kolesnikov* |
|---|---|
| 2017  | ![2017_internship_thumb](/images/thumbs/pub/Stage_2017_thumb.png) | [**Research internship at Google Brain London**](https://arxiv.org/abs/1711.05139) <br> 🇬🇧  *London, United Kingdom* <br> <u>Topic:</u> Unsupervised image-to-image translation combining GANs and domain adaptation techniques, advised by *Konstantinos Bousmalis*, *Stephan Gouws* and *Fred Bertsch* |
|---|---|
| 2015 | ![2015_internship_thumb](/images/thumbs/pub/Stage_2015_thumb.png) |  [**Internship at Inria Rennes**](/files/Stage_2015_Rapport_Royer.pdf) <br> 🇫🇷 *Rennes, France*  <br> <u>Topic:</u> Unsupervised clustering via random classifiers for text and audio clustering, advised by *Vincent Claveau* and *Guillaume Gravier* |
| 2014  | ![2014_internship_thumb](/images/thumbs/pub/Stage_2014_thumb.jpg) | [**Internship at IST Austria**](/files/Stage_2014_Rapport_Royer.pdf) <br> 🇦🇹  *Vienna, Austria* <br> <u>Topic:</u> Adapting pre-trained classifiers to unknown test labels distribution on-the-fly, advised by *Christoph Lampert* |
| 2013  | ![2013_internship_thumb](/images/thumbs/pub/Stage_2013_thumb.png) |  [**Internship at Inria Rennes**](/files/Stage_2013_Rapport_Royer.pdf)  <br> 🇫🇷 *Rennes, France* <br> <u>Topic:</u> Video retrieval using circular Fourier transforms, advised by *Hervé Jégou* and *Teddy Furon*  |



## <i class="fa fa-paperclip" aria-hidden="true"></i> Selected Publications

{% assign years = site.publications | group_by: "year" | sort: "name" | reverse %}
<ul class="short_publications_list">
  {% for y in years %}
    {% assign sorted = y.items | sort: "venue" | reverse %}
    {% for post in sorted %}
      {% if post.selected %}
        {% include archive-single-cv.html %}
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>

## <i class="fa fa-magic" aria-hidden="true"></i> Skills

  * **Languages**
    * 🇫🇷 French (*native speaker*)
    * 🇬🇧 English (*fluent*) <br>&#160;&#160;&#160;&#160;<small>FCE/B2 in 2010, TOEIC (990/990) in 2013</small>
    * 🇩🇪 German (*advanced*) <br>&#160;&#160;&#160;&#160;<small>ZD/B1 in 2008, ZMP/C1 in 2010
  </small>
  * **Software**
    * `Python`, `C++/C`, `OCaml`
    * Deep Learning:  `Pytorch`, `Tensorflow`, `Jax`, `Keras`
    * Visualization: `matplotlib`, `streamlit`, `LateX`
    * Version control: `git`
