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

<table style="border: 0; border-collapse: separate; border-spacing: 0 25px;">
  {% assign years = site.publications | group_by: "year" | sort: "name" | reverse %}
  {% for y in years %}
    {% assign sorted = y.items | sort: "venue" | reverse %}
    {% for post in sorted %}
      {% include archive-single.html %}
    {% endfor %}
  {% endfor %}
</table>
