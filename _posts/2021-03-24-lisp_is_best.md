---
title: Lisp Is The Best Programming Language Because It's The Only Programming Language
thumbnail: lisp-thumb.png
---

```plaintext
(What the world needs
    (I think)
    (is not
        (a Lisp (with fewer parentheses))
        (but (an English
            (with more.)))))
```

I think it's about time, as a member of the Lisp cult, to write my obligatory blog post about why Lisp is the best programming language. I've alluded to this in the past when talking about other languages I like.

> * [things i like about object-oriented programming](/post/oop_is_okay)
>
> [...] Elixir has the best modularity of any functional language (that's not a Lisp) [...]
>
> * [stop picking on the borrow checker ;(](/post/stop_picking_on_the_borrow_checker)
>
> [...] Rust is the most well designed language for developer UX (that isn't a Lisp) [...]

But Lisp isn't the best language because of "functional programming", or "type soundness", or "local reasoning", or "correctness", or any other of that nonsense that lesser languages need in order to compete with each other.

No, leave that crap for the children to fight over.

Lisp is the best programming language because it's the only programming **language**. The emphasis on **language** is important here.

Most programming languages have several syntax rules. Lisp has one: everything is a list.(^1) The first element is a function name, and the rest are its arguments. Thus, the language is simply a collection of compile and run-time functions, trivially extensible.

(^1): LISP stands for LISt Processing, although we don't refer to Lisp with the acronym anymore.

Lisp, created in 1959, is the oldest language in widespread use. Because Lisp programs are just a simple data structure, Lisp has a powerful macro facility which can be used to extend the basic language. When new styles of programming were invented, other languages died out and Lisp simply incorporated the new styles by defining some new macros.

Lisp is the only **descriptive** programming language.

A natural languages' "descriptive grammar" is a linguist's description or model of the mental grammar, including the units, structures and rules. It's an explicit statement of what speakers know about their language. This is in contrast to a "prescriptive grammar", where rules of grammar are brought about by grammarians' attempts to legislate what speakers' grammatical rules should be, rather than what they are.

> Imagine adding object orientation to the C and Scheme programming languages. Making Scheme object-oriented is a sophomore homework assignment. On the other hand, adding object orientation to C requires the programming chops of Bjarne Stroustrup.
>
> The consequences of this divergence in needed talent and effort cause [The Lisp Curse:](http://www.winestockwebdesign.com/Essays/Lisp_Curse.html)
>
> Lisp is so powerful that problems which are technical issues in other programming languages are social issues in Lisp.

Other languages try their hardest to force you into their syntactical rules (looking at you, Go), they have specifications with thousands of words specifying every little lexical element that you **MUST** use or the compiler will scream and throw the language whitepaper at your face.

Not Lisp. Lisp just hands you a pair of these lovely boys `()` and says, "these are my favourite parentheses, they're called 'special expressions'. You can use them to do whatever you want."

> In other languages you fit your problem to the language; with Lisp you extend the language to fit your problem.

But sure, maybe you want to be screamed at. Maybe you like reading language specifications. Maybe you want to do things the "right" way. That's fair, some people need to be hand-held by the language designers so they know what they're supposed to do. But maybe, instead of relying on your language to determine what's "correct", you should try...

**Being a better programmer.**

Lisp is the only language with actual **dialects**.

Every natural language is part of a family (eg. English is part of the Indo-European family along with Spanish, French, German, etc.)(^2) and can have several dialects, that are the variety of that language whose grammar differs in systematic ways from other varieties (eg. British English, African-American Vernacular English, Australian English, etc.).

(^2): This can be subdivided further with English and German being part the Germanic branch of languages in the Indo-European family.

While C++ and Go are in the same family of C, they are completely different languages are require a paradigm shift in thinking (and in the language itself) to learn and use one from the other. Scheme and Clojure, on the other hand are still technically different languages that attempt to do very different things, but they're both dialects of Lisp so it's incredibly easy to go from one to the other.

You could argue that this is a bad thing. That natural languages only have so many dialects because language is an important part of culture and different dialects naturally occurs because of that. But bytes have no culture, and having so many (too many I would argue) slightly different variations of the same language provides none of the benefits and all of the negatives: like sowing dissent on the "other" and believing you're better than someone just because they use a dialect you don't.(^3)

(^3): There's nothing wrong with liking Clojure okay! ;( Shut up.

And let's not forget The Lisp Curse.

> Since making Scheme object-oriented is so easy, many Scheme hackers have done so. More to the point, many *individual* Scheme hackers have done so. In the 1990s, this led to a veritable warehouse inventory list of object-oriented packages for the language. The Paradox of Choice, alone, guaranteed that none of them would become standard.

You know what? You're absolutely right, we don't need a thousand different Lisp dialects. But don't you think that the fact that you can even do this is...

**COOL AS FUCK.**

Okay, okay, I'll admit, it's not all sunshine and rainbows here in the Lisp cult. Don't tell the other members I'm saying this because they might get mad and lock me up, but there are *some* downsides to Lisp.

The first is that since Lisp is still a relatively niche language, the ecosystem isn't *quite* there compared to the big boys. The tooling is good, but still a bit lacking. I blame this on most Lisp programmers using Emacs(^4) and hogging all the good tools, leaving us Vimmers with our sub-standard scripting language to rot. This isn't an issue with Lisp but with people, but it's still important.

(^4): Emacs is written in Lisp, which is also why it is highly extensible.

Also Clojure is run on the JVM which means it can tap into any Java class. So like... just use that if you're afraid there aren't enough libraries.(^5)

(^5): No it's good that it runs on the JVM, I swear! Please stop laughing at me ;(

The second issue is that even though it's super extensible, you can't extend it into a lower level language like Rust (and get the same benefits as a systems language). But who actually cares? Only insane people who have seen horrors beyond our comprehension are able to do systems programming.

So actually, I've changed my mind, the only problem Lisp has is that people don't use it.

**Cough, cough.**

---

If you want recommendations with Lisp:

* Start with learning [Clojure.](https://clojure.org)(^6)
    * Maybe watch Rich Hickey's (creator of Clojure) talk, ["Simple Made Easy".](https://www.infoq.com/presentations/Simple-Made-Easy/) It isn't about Clojure but it is a very good introduction to many of Clojures' concepts.
* For fellow Vimmers, [conjure](https://github.com/Olical/conjure) and [parinfer-rust](https://github.com/eraserhd/parinfer-rust) are great plugins to use.
    * [Parinfer](https://shaunlebron.github.io/parinfer/) is especially important as it makes writing Lisp a thousand times easier.

(^6): PLEASE! IF THERE ARE MORE OF US, THEY WON'T BE ABLE TO MAKE FUN OF EVERYONE.

Also, the quote at the start is from Brian Hayes, ["The Semicolon Wars"](https://web.archive.org/web/20060616171535/http://www.americanscientist.org/template/AssetDetail/assetid/51982/page/5) and the thumbnail is [xkcd 297.](https://xkcd.com/297/)
