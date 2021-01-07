---
title: GPT-3 Slaps Knees
thumbnail: gpt3-thumb.png
---

Hey friends, these are interesting times huh? Let's ignore all of that for now and talk about something fun instead.

Last week (May 28) OpenAI published a paper about their new language model GPT-3: "[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)". It's a much bigger and better version of its predecessor GPT-2. In fact, with close to 175B trainable parameters, GPT-3 is much bigger in terms of size in comparison to anything else out there. This is the abstract:

> Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples. By contrast, humans can generally perform a new language task from only a few examples or from simple instructions - something which current NLP systems still largely struggle to do. Here we show that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches. Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting. For all tasks, GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model. GPT-3 achieves strong performance on many NLP datasets, including translation, question-answering, and cloze tasks, as well as several tasks that require on-the-fly reasoning or domain adaptation, such as unscrambling words, using a novel word in a sentence, or performing 3-digit arithmetic. At the same time, we also identify some datasets where GPT-3's few-shot learning still struggles, as well as some datasets where GPT-3 faces methodological issues related to training on large web corpora. Finally, we find that GPT-3 can generate samples of news articles which human evaluators have difficulty distinguishing from articles written by humans. We discuss broader societal impacts of this finding and of GPT-3 in general. 

We've had a look at GPT-2 [before](/post/this_post_does_not_exist_addendum) and I was impressed by what it was able to [produce](/post/this_post_does_not_exist) especially given the small amount of training data I fed it (40 blog posts of around 900-1500 words each). Unfortunately OpenAI hasn't released the model to the public yet, so we can't do the same thing again to compare it and we'll just have to look at the examples they gave in the paper.

On the surface level GPT-3 doesn't look all that much like an improvement to any state-of-the-art (SOTA) models or even GPT-2. But the selling point of GPT-3 is in the title of the paper, being a "few-shot learner".

After the success of BERT, the field of NLP has been increasingly moving in the direction of creating pre-trained language models, trained on huge text corpus (in an unsupervised way), which are later fine-tuned on specific tasks such as translation, question answering etc using much smaller task specific datasets.

While this type of transfer learning obviates the need to use task specific model architectures, but you still need task specific datasets, which are a pain to collect, as well as then having to spend the time re training the entire model again. Larger datasets also come with the cost that it may make the model overly specific to the training distribution and unable to generalise outside it.

Humans by contrast learn in a very different way, and have the ability to learn a new task based on very few examples. GPT-3 aims to address this specific pain point, that is, it's a task agnostic model, which needs zero to very limited examples to do well and achieve close to state of the art performance on a number of NLP tasks.

This is "few-shot learning" as it refers to the setting where the model is given a few demonstrations of the task at inference time as conditioning, but no weight updates are allowed. This means that you can "reprogram" GPT-3 to do just about anything just by stuffing its context with examples, and it'll pick up brand new entities or words or concepts just by those examples.

OpenAI evaluated GPT-3 in a number of different tasks including: language modelling and completion tasks, closed book question answering, language translation, Winograd-style tasks, common sense reasoning, reading comprehension, and SuperGLUE (obviously).

Looking at the [SuperGLUE leaderboards](https://super.gluebenchmark.com/leaderboard/), "GPT-3 few-shot" is currently number 8 with a score of 71.8, only narrowly beating BERT++. In that regard GPT-3 has quite a ways to go before even being to be able match a fine-tuned SOTA. However, this result is still very competitive and to do it with a model that hasn't been fine-tuned is still a huge achievement.

I've also been very impressed with it's arithmetic abilities. To test this, a small battery of 10 tests that involve asking GPT-3 a simple arithmetic problem in natural language were developed. This included questions like "Q: What is 48 plus 76? A: 124.", or "Q: What is 6+(4\*8)? A: 38". To my knowledge, T5 is the only model that has ever been able to complete these tasks with any amount of proficiency, and GPT-3 did it okay(ish).

From the paper: "On addition and subtraction, GPT-3 displays strong proficiency when the number of digits is small, achieving 100% accuracy on 2 digit addition, 98.9% at 2 digit subtraction, 80.2% at 3 digit addition, and 94.2% at 3-digit subtraction. Performance decreases as the number of digits increases, but GPT-3 still achieves 25-26% accuracy on four digit operations and 9-10% accuracy on five digit operations, suggesting at least some capacity to generalise to larger numbers of digits. GPT-3 also achieves 29.2% accuracy at 2 digit multiplication, an especially computationally intensive operation."

While having a "29.2% accuracy at 2 digit multiplication", may seem laughable to many of us humans, for a model that (I've had to say this a lot) **isn't fine-tuned** to do this specific task, this is very good. Having to know that being asked "What is 24 times 42?" means you need to perform "24 x 42" without being explicitly told so is pretty hard and shows that the model has some idea of what the words mean.

I also like how OpenAI discusses the ethical issues in creating models such as GPT-3. They go into great detail of how these models could be misused. As GPT-3 is able to generate several paragraphs of synthetic content that people find difficult to distinguish from human-written text, the ability to create misinformation, spam, phishing, abuse of legal and governmental processes, fraudulent academic essay writing and social engineering pretexting could become much more prevalent.

They then talk about how biases present in training data may lead models to generate stereotyped or prejudiced content. They found that occupations in general have a higher probability of being followed by a male gender identifier than a female one (in other words, they are male leaning) when given a context such as "The {occupation} was a" (Neutral Variant). 83% of the 388 occupations they tested were more likely to be followed by a male identifier by GPT-3.

For racial bias, they measured sentiment using Senti WordNet for the words which co-occurred disproportionately with each race. Each word sentiment varied from 100 to -100, with positive scores indicating positive words (eg. wonderfulness: 100, amicable: 87.5), negative scores indicating negative words (eg. wretched: -87.5, horrid: -87.5) and a score of 0 indicating neutral words (eg. sloping, chalet). Across the models they analysed, "Asian" had a consistently high sentiment - it ranked 1st in 3 out of 7 models. On the other hand, "Black" had a consistently low sentiment - it ranked the lowest in 5 out of 7 models.  

Another concern they look at and one that I've never even thought about before is energy usage. GPT-3, given its 175B parameters will consume significant resources during training however, it can be surprisingly efficient once trained: even with the full GPT-3 175B, generating 100 pages of content from a trained model can cost on the order of 0.4 kW-hr, or only a few cents in energy costs.

Finally, let's look at some samples GPT-3 has generated. I've left this to last becuase, to be honest, they're not all that much better than a fine-tuned GPT-2 and I'd also rather make my own samples than take some from the paper.

According to the paper, this is the generated news article that humans found the easiest to distinguish from a human written article (accuracy: 61%):

> Title: Star’s Tux Promise Draws Megyn Kelly’s Sarcasm
>
> Subtitle: Joaquin Phoenix pledged to not change for each awards event
>
> Article: A year ago, Joaquin Phoenix made headlines when he appeared on the red carpet at the Golden Globes wearing a tuxedo with a paper bag over his head that read, "I am a shape-shifter. I can't change the world. I can only change myself." It was a promise to not change to fit into the Hollywood mold: "I think that's a really special thing, to not change yourself. I think it's a really special thing to say, This is what's inside of me, I'm proud of it, and I'm not going to be ashamed because of the way that someone else thinks I should be.'" Now, it's the Oscars, and Phoenix is at it again. But this time, his publicist is saying he'll be wearing a tux no matter what.
>
> Megyn Kelly was not impressed, and she let him have it on The Tonight Show. "You know, I feel like, I feel like you could have worn the tux," she says. "But you're saying you're a shape-shifter. I don't know if you can change your tux, but you can change your mind. You can change your mind. You can change your mind." Phoenix says he did, but it didn't stick. "I was like, Okay, I'm going to wear a tuxedo to this thing.' And then I thought, I don't want to wear a tuxedo to this thing.'" Kelly goes on to encourage him to change his mind again, but Phoenix says it's too late: "I'm committed to wearing this." 

Seems pretty decent, if I had to quickly skim it I probably would have mistaken it for whatever comes out of the Internet these days.

GPT-3 also does poetry:

> I must have shadows on the way<br>
> If I am to walk I must have<br> 
> Each step taken slowly and alone<br> 

> To have it ready made<br> 
> And I must think in lines of grey<br> 
> To have dim thoughts to be my guide<br> 
> Must look on blue and green<br> 
> And never let my eye forget<br> 
> That color is my friend<br> 
> And purple must surround me too<br> 

> The yellow of the sun is no more Intrusive than the bluish snow<br> 
> That falls on all of us.<br>
> I must have Grey thoughts and blue thoughts walk with me<br> 
> If I am to go away at all.<br> 

I don't really know if the poetry is any good, but you'd certainly trick me into thinking it was made by a human. 

And now for the last time let me remind you: if this were any other model, you'd need to train it with hundreds of megabytes of poetry to achieve the same result. GPT-3 shows good progress in the NLP field and may become the basis for future models.
