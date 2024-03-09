---
title: "Codenames Solo"
date: 2024-03-08 18:00:00 +0200
github: "https://github.com/ameroyer/codenames_solo"
languages: [python, streamlit]
thumb: /images/thumbs/portfolio/codenames.jpg
twitter_summary: A streamlit-based app to play CodeNames against an AI 
---

[Codenames](https://codenamesgame.com/) is probably one of my favorite party games published in recent years. The core concept is extremely simple: Find a single-word hint which semantically links the words from your team, while being as unrelated as possible to the words on your opponent's team. In this blog post, I will briefly discuss how we can leverage language modeling to build a simple Codenames bot using `streamlit` and the OpenAI API. The resulting app is [hosted on Streamlit Cloud](https://codenames-solo.streamlit.app) and embedded below:

<iframe src="https://codenames-solo.streamlit.app/?embed=true" height="650" style="width: 100%"></iframe>


## <i class="fa fa-book"></i>  The rules
First, let's look at the rules of Codenames a bit more in-depth from a representation learning perspective: Let's denote by $P$ the words on your team which you want to relate, and $N$ the ones you want to steer away from. In reality, $N$ is composed of three subsets:

  * $N_{ntr}$: The **neutral words**. Wrongly guessing one of those will end your team's turn but does not directly benefit your opponent.
  * $N_{opp}$: Your **opponent's words**. Wrongly guessing any of those will bring your opponent closer to victory. 
  * $N_{kll}$: The **assasin word**. Wrongly guessing it will make your team's lose the game hence should be avoided at all cost.

### Spymaster
Each team is composed of two roles: First, the (unique) ***spymaster*** has full knowledge of $P$ and $N$ and is tasked with giving hints. In other words, they want to find an embedding function $\phi$ and a hint word $h \notin W$ such that:

$$
\begin{align}
\exists k_h,\ \exists W^{\ast} = \{w_1, \dots w_{k_h}\} \subseteq P, \text{ such that }  \forall w \in W^\ast,\ || \phi(h) - \phi(w) || < \epsilon \\
\forall w \in N,\ || \phi(h) - \phi(w) || > \tau
\end{align}
$$

Following **(1)**, the spymaster gives a hint in the form "$h : k_h$", i.e. they give the hint word $h$, which they believe relates to $k_h$ words in $P$ while being far away from any of the words in $N$. In contrast, **(2)** states that the hint $h$ does not relate to any word from $N$. Note that in practice, **a good spymaster would have different values of $\tau$**, one for each subset $N_{ntr}, N_{opp}, N_{kll}$, where $\tau_{kll} > \tau_{opp} > \tau_{ntr}$, capturing how a wrong guess in each of these subsets impacts the game differently. 

Finally, an ideal hint would be such that $\epsilon\ <<\ \tau$. Intuitively, we can see **the quantity $\epsilon - \tau$ as the amount of risk the spymaster is willing to take**, taking into account potential wrong guesses from their spies. (This also means that "knowledge of your teammates's semantic associations" is an implicit parameter when building the embedding $\phi$, which is all the fun of the game)

### Spies
On the other hand, the spies only see the words $W = P \cup N$ but do not know how it decomposes between $P$ and $N$ ($\sim$ latent variables from the spies perspective). In each turn, they receive the hint from the spymaster and their goal is to ***reconstruct the embedding $\phi$*** to improve their knowledge of $P$. 


### A representation learning problem
In summary, both spymaster and spies aim to build a semantic embedding of the words on the board, only with different information. We will denote by $\tilde{P}$ (resp. $\tilde{N}$) the words which have been guessed (correctly or incorrectly): All players know which team these cards belong to and as the game progresses, the spies increase their knowledge of $P$ and $N$.
  * The ***spymaster*** has full knowledge of the "value" of each word on the board. In each round $t$, they have to build a new embedding based on which words have already been guessed on the board $$\Phi^{\text{spymaster}}: \left( \tilde{P}_{t-1}, \tilde{N}_{t-1}, P, N \right) \mapsto \phi_t$$.
  * The ***spies*** only have partial information of what is currently visible on the board and the hint given by the spymaster. In other words: $$\Phi^{\text{spy}}: \left( \tilde{P}_{t-1}, \tilde{N}_{t-1}, h_{\leq t}, k_{h, \leq t} \right) \mapsto \phi_t$$.


## Building word embeddings

### Word2Vec
Word2Vec was proposed in 2013 by [Mikolov et al](https://arxiv.org/abs/1301.3781) and received a test of time award recently at NeurIPS 2023. The core idea of the paper is to build continuous representations of words by solving a local word prediction task. Using such a method, we can easily build the embedding $\phi$; However, it is not clear how we can make this embedding conditioned on our sets of words $P$ and $N$ to give appropriate hints. 

  * One potential direction is the literature on **topic modelling** such as [LDA2Vec](https://multithreaded.stitchfix.com/blog/2016/05/27/lda2vec/#topic=38&lambda=1&term=). However, such methods typicall act on a set of **entire documents**, while we only want to build a global understanding of the rather small subsets of words $N$ and $P$.
  * An other idea is to use the **geometries of word embeddings**: We could modify the embedding learned by Word2Vec to condition it on our knowledge of $P$ and $N$, for instance, using projections or some form of clustering. After giving this idea a try on some toy examples, I found the quality of the hints to vary greatly, especially when trying to link more than 2 words. Nevertheless, if you want to dig more in this derection, there are several examples of Codenames bots using Word2Vec or more advanced word embeddings, such as [Playing Codenames with Language Graphs and Word Embeddings, Koyyalagunta et al, 2021](https://github.com/divyakoyy/codenames) or [this blog post by Jeremy Neiman](https://towardsdatascience.com/how-to-create-a-codenames-bot-part-1-word2vec-62701de38e66).


### LLM
LLMs (Large Language Models) are slightly different from the previous two methods in that they do not explicitly encode words. Rather, they are usually transformer-based, generally use sub-word tokenization and are trained for sentence prediction/generation. 

Despite this different structure, LLMs do learn implicity to encode words (or rather tokens). In addition, one very interesting property of LLMs is their zero-shot learning ability, or what we often refer to as ***In-Context Learning***: By prepending a prompt to a query, we can modify the "function" of the LLM since any past tokens will impact future predictions through the attention layers. For strong enough LLMs, in practice this generally means that **we can easily get the model to solve a specific task by feeding it a relevant prompt/instruction**, even if it hasn't been explicitly finetuned for said tasks. I

As a result, we can define the function $$\Phi^{\text{spymaster}}$$ (resp. $$\Phi^{\text{spy}}$$) as  handcrafting a prompt that integrates all the knowledge of the spymaster (resp. spy), then use it to query the LLM and returns the hint (resp. guess) from the spymaster (resp. spy).


#### Further reads
  * If you want to dig further in the differences and similarities between Word2Vec and nowadays LLMs, have a look at [this blog post from Francçis Chollet](https://fchollet.substack.com/p/how-i-think-about-llm-prompt-engineering)
  * In addition the [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings) as well as [this blogpost](https://bratanic-tomaz.medium.com/constructing-knowledge-graphs-from-text-using-openai-functions-096a6d010c17) are two ways to build a more structured knowledge graph on words using a LLM, irregardless of the chosen tokenization.

## <i class="fa fa-dice"></i> Codenames Solo

Based on these insights, we can build a simple "Solo mode" for Codenames by ***prompting a LLM to act as the sypmaster***. Interestingly, the model used here seems to already know about the rules of the game since even a very simple instruction such as the one below yields reasonable hints: 

  > You are playing Codenames as a bold and creative spymaster giving hints.
  > Your answers should be in the format WORD - NUMBER.

Of course this instruction still results in occasional ***errors or suboptimal moves*** such as:
  * The hint given is not in the right format (e.g. wrong formatting, or $k_h < 0$)
  * The spymaster ignores one of the rule that the hint given must not be one of the words visible of the board. 
  * The hints tend to be a bit repetitive. For instance words like "Adventure", "Nature", "Agent" or "Space" are often given as hints to link more than 3 words.
  * The spymaster does not pay enough attention to the words to avoid, leading to wrong guesses from the spies.

Nevertheless, **the resulting spymaster performs quite well in practice, especially when we consider the simplicity of the prompt/methodology**. With in-context learning, we can even easily change the language of the game on-the-fly by adding a simple instruction such as `You play the game in French and you give all your hints in French` (though to be honest, switching to a language different than English tends to decrease the quality of the hints). Hopefully, a bit of prompt engineering work could go a long way in defining better and more diverse spymasters for a better game experience.
