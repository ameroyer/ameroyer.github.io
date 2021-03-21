---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---
{% if page.author and site.data.authors[page.author] %}
  {% assign author = site.data.authors[page.author] %}{% else %}{% assign author = site.author %}
{% endif %}

<h1 class="page__title"><a href="{{ author.googlescholar }}" title="Google Scholar" target="_blank"><i class="ai ai-google-scholar ai-lg"></i></a> Publications</h1>

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
