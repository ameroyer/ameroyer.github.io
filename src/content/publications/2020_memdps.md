---
title: "Multiple-Environment Markov Decision Processes: Efficient Analysis and Applications"
paperurl: "/files/icaps_memdps_2020.pdf"
slides: "https://www.youtube.com/watch?v=cpx67Zy8k2g"
poster: "/files/posters/paper_104_poster.pdf"
year: 2020
selected: false
authors: 'Krishnendu Chatterjee, Martin Chmelík, <span class="first_author">Deep Karkhanis</span>, Petr Novotný and <span class="first_author">Amélie Royer</span>'
venue: "International Conference on Automated Planning and Scheduling (ICAPS)"
code: "https://github.com/ameroyer/ReCA"
teaser: "thumbs/pub/memdp_thumb.png"
bibtex: |
  @InProceedings{Chatterjee_2020_ICAPS,
    author = {Chatterjee, Krishnendu and Chmelík, Martin and Karkhanis, Deep and Novotný, Petr and Royer, Amélie},
    title = {Multiple-Environment Markov Decision Processes: Efficient Analysis and Applications},
    booktitle = {International Conference on Automated Planning and Scheduling (ICAPS)},
    year = {2020}
  }
---

Multiple-environment Markov decision processes (MEMDPs) are MDPs equipped with not one, but multiple probabilistic transition functions, which represent the various possible unknown environments. While the previous research on MEMDPs focused on theoretical properties for long-run average payoff, we study them with discounted-sum payoff and focus on their practical advantages and applications. MEMDPs can be viewed as a special case of Partially observable and Mixed observability MDPs: the state of the system is perfectly observable, but not the environment.

We show that the specific structure of MEMDPs allows for more efficient algorithmic analysis, in particular for faster belief updates. We demonstrate the applicability of MEMDPs in several domains. In particular, we formalize the sequential decision-making approach to contextual recommendation systems as MEMDPs and substantially improve over the previous MDP approach.
