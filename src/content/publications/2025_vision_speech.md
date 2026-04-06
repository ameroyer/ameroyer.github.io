---
title: "Vision-Speech Models: Teaching Speech Models to Converse About Images"
paperurl: "https://arxiv.org/abs/2503.15633"
code: "https://github.com/kyutai-labs/moshivis"
demo: "https://vis.moshi.chat"
teaser: "thumbs/pub/moshivis.png"
year: 2026
selected: true
authors: '<span class="first_author">Amélie Royer</span>*, Moritz Böhle*, Gabriel de Marmiesse, Laurent Mazaré, Neil Zeghidour, Alexandre Défossez, Patrix Pérez'
venue: "Conference on Computer Vision and Pattern Recognition (CVPR)"
---

The recent successes of Vision-Language models raise the question of how to equivalently imbue a pretrained speech model with vision understanding, an important milestone towards building a multimodal speech model able to freely converse about images. Building such a conversational Vision-Speech model brings its unique challenges: (i) paired image-speech datasets are much scarcer than their image-text counterparts, (ii) ensuring real-time latency at inference is crucial thus bringing compute and memory constraints, and (iii) the model should preserve prosodic features (e.g., speaker tone) which cannot be inferred from text alone. In this work, we introduce MoshiVis, augmenting a recent dialogue speech LLM, Moshi, with visual inputs through lightweight adaptation modules. An additional dynamic gating mechanism enables the model to more easily switch between the visual inputs and unrelated conversation topics. To reduce training costs, we design a simple one-stage, parameter-efficient fine-tuning pipeline in which we leverage a mixture of image-text (i.e., "speechless") and image-speech samples. We evaluate the model on downstream visual understanding tasks with both audio and text prompts, and report qualitative samples of interactions with MoshiVis. Our inference code will be made available, as well as the image-speech data used for audio evaluation.
