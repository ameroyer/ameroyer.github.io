---
title: "Moshi: A Speech-Text Foundation Model for Real-Time Dialogue"
paperurl: "https://arxiv.org/abs/2410.00037"
code: "https://github.com/kyutai-labs/moshi"
demo: "https://moshi.chat"
slides: "https://www.youtube.com/live/hm2IJSKcYvo"
year: 2024
selected: false
teaser: "thumbs/pub/moshi.png"
authors: 'Alexandre Défossez, Laurent Mazaré, Manu Orsini, <span class="first_author">Amélie Royer</span>, Patrick Pérez, Hervé Jégou, Edouard Grave, Neil Zeghidour'
venue: "Technical Report"
---

We introduce Moshi, a speech-text foundation model and full-duplex spoken dialogue framework. Current systems for spoken dialogue rely on pipelines of independent components, namely voice activity detection, speech recognition, textual dialogue and text-to-speech. Such frameworks cannot emulate the experience of real conversations. First, their complexity induces a latency of several seconds between interactions. Second, text being the intermediate modality for dialogue, non-linguistic information that modifies meaning -- such as emotion or non-speech sounds -- is lost in the interaction. Finally, they rely on a segmentation into speaker turns, which does not take into account overlapping speech, interruptions and interjections. Moshi solves these independent issues altogether by casting spoken dialogue as speech-to-speech generation. Starting from a text language model backbone, Moshi generates speech as tokens from the residual quantizer of a neural audio codec, while modeling separately its own speech and that of the user into parallel streams. This allows for the removal of explicit speaker turns, and the modeling of arbitrary conversational dynamics. We moreover extend the hierarchical semantic-to-acoustic token generation of previous work to first predict time-aligned text tokens as a prefix to audio tokens. Not only this "Inner Monologue" method significantly improves the linguistic quality of generated speech, but we also illustrate how it can provide streaming speech recognition and text-to-speech. Our resulting model is the first real-time full-duplex spoken large language model, with a theoretical latency of 160ms, 200ms in practice
