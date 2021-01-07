---
title: Does The Sapir-Whorf Hypothesis Apply To Programming Languages?
thumbnail: wug-thumb.png
---

This question came to me from a Medium post from Alvaro Videla called “[Programming Languages are not Languages](https://medium.com/@old_sound/programming-languages-are-not-languages-c6f161a78c44)”. You should read it first as I agree with most of it but I think there's more to add.

Let’s start with the main point that “programming languages are not languages”. In my opinion, there is only one feature of programming languages that you could compare to a natural language: syntax.

Programming languages are **formal languages** which consist of strict formation rules often described by a context-free grammar. Formal language theory sprang out of linguistics, as a way of understanding the syntactic regularities of natural languages.

Syntax is the only link a programming language has to a natural language and the comparison of any other linguistic feature is invalid because they are different things. Even then, a natural language subscribes to the view of “if you understand it, then it’s correct”,(^1) and can break its own syntactical/grammatical rules for literary technique, something you’d never see in a programming language.(^2)

(^1): Mostly, that kind of depends on a few things like if other people agree it is correct and start using it too.

(^2): Or in fact, in any formal language.

I’d really like to drill this into you, so here’s a few more things:

Natural languages are for communication between humans (because we are the only ones who can understand our own languages). And while programming languages are certainly not for communication between humans, you could argue that you “communicate” with the computer. But I’ve opened this can of worms before and that ended up in a philosophical debate about “conversation”, so I’d rather not talk about it.

Programming languages are also much more than the “language”, you have the compiler or interpreter, build tools, and configuration files.(^3) Videla also notes how these are often in a variety of different languages. Many people would also say that the community and ecosystem are part of the language too.

(^3): You may disagree with this, but I simply don’t see how you could have a Rust without a  `rustc` and `cargo`. They’re both a part of Rust and why you’d use it.

With natural languages you can literally just take things from other languages and have it work. Think of all the French, German, and Spanish loanwords (and phrases) we have in English. In comparison, it would be impossible to put Python’s whitespace rules into Java without breaking “over 6 billion programs”.

If you’re thinking that it’s unfair to compare loanwords to taking entire programming language design features, then yeah! That was the point, you can’t compare them, good job on figuring it out.

With all that done, let’s get back to asking “does the Sapir-Whorf hypothesis apply to programming languages?”

I’ve mentioned what the Sapir-Whorf hypothesis was [before](/article/hsc_english), but I like to pad out my posts so I’m going to do it again.

The Sapir-Whorf hypothesis “is a principle claiming that the structure of a language affects its speakers’ world view or cognition, and thus people’s perceptions are relative to their spoken language.”

However last time I talked about it, I actually forgot to mention that there was a weaker version of it which states “that language provides constraints in some areas of cognition, but that it is by no means determinative.” This version is more popular and has actual evidence for it, but is still debated.

Videla argues that the Sapir-Whorf hypothesis doesn’t fully applies to programming languages because “when we program we categorize the world in English (or Spanish, or any other natural language), and then we encode that into a program. So the programming language I’m using, is not limiting the way in which I see the world.”

Not everybody “categorises” the world in a language. [Visual images often intrude on verbal thinking](https://news.harvard.edu/gazette/story/2017/05/visual-images-often-intrude-on-verbal-thinking-study-says/) and in a field like programming, I’d say your thoughts are much more abstract with data structures and control flow. But his point still stands either way, your brain determines how you process the world and you use a programming language to describe it to the computer.

While never explicitly mentioning Sapir-Whorf, Paul Graham’s “[Beating the Averages](http://www.paulgraham.com/avg.html)” inadvertently argues in favour of it.

The so-called [blub paradox](https://en.wikipedia.org/wiki/Blub_paradox) (after a hypothetical programming language of average complexity called “Blub”) says that anyone preferentially using some particular programming language will know that it is more powerful than some, but not that it is less powerful than others.  Hence the paradox, because typically programmers are “satisfied with whatever language they happen to use, because it dictates the way they think about programs”.

I find this deeply flawed. Here’s one thing that natural and programming languages share: there is no **best** language. But they share this for different reasons.

There’s no best natural language because you can express any idea in any language. It may be a little harder or easier in some, but they all have advantages and trade offs.

And there’s no best programming language because like Videla says, “they’re tools”. You use different tools for different jobs. Graham talked a lot of hype about how Lisp allowed them to beat all the competition. It may be true that Lisp was objectively the best language for what they were doing, but I can easily think of one area where Lisp would be one of the worst: systems programming.

You can’t deny that functional programming historically creates programs with worse performance than low level languages. It may never even be possible for a functional language to catch up in this regard due to the necessity of a garbage collector. If I ever write an OS, no way am I ever going to use Clojure, I’m going to build that bad boy in Rust.

There’s also the notion that programmers are “satisfied with whatever language they happen to use”, which I find incredibly confusing. I’ve never met a person who was “satisfied” with their language, there’s always something missing, broken, or “not up to the task”.

Graham’s arguments seem to align with the strong version of Sapir-Whorf, which don’t apply to natural languages and as we now know, don’t apply to programming languages.

However, that’s not to say that a programming language doesn’t change how you think about programming, because it absolutely does. I know from experience that learning functional programming languages (like Clojure) has changed how I write code even in non-functional languages.

I can see why people would conflate this with the weaker Sapir-Whorf and I think the area of how different programming paradigms influence how people write code is an interesting one. It’s related to linguistic relativity so I don’t know what that would actually be called apart from the “weaker version of the Sapir-Whorf hypothesis but for programming”, whatever that means.

Perhaps we should make a new hypothesis derived from Sapir-Whorf (like how formal language theory came from natural languages) and have it specify programming paradigms. This way it would be much clearer on what we are actually talking about when in the context of programming languages.

Maybe we could call it something like the “Videla-Duch hypothesis” 🙂.

Actually on second thought, that felt gross to type out for some reason.(^4) Please don’t call it that.

(^4): I think it’s the negative connotations I have with the Sapir-Whorf hypothesis.
