---
title: Stop Picking On The Borrow Checker ;(
thumbnail: borrow-checker-thumb.png
---

Ferris is trying his best to make you write good code okay! Don't be mean to him!

Every once in a while in my programming circles, people start talking about Rust. And in these discussions there is always someone saying that the language would be better if the ownership model was replaced with a garbage collector.

This mostly comes from people who a new to the language and haven't wrapped their head around ownership and borrowing. Which is fair enough I suppose, ownership isn't a new concept or anything but I don't actually know the names of any languages that have done it before Rust so it's going to be a foreign concept to most people.

But to be honest, in all my 3 years of writing Rust, I've never once had an issue with the borrow checker that wasn't immediately solved by `rustc` telling me how to fix it. So I can only assume that the ownership model isn't actually that hard to understand and that everyone complaining about it is stupid.

Still, the borrow checker is an integral part of Rust and the reason it works. When people talk about the main benefits of using Rust (and it's ownership model) they will normally go to memory safety as the most important point. Rust provides the ability to largely move to a world where the bugs are in logic and not in buffer/array verification or multi-threading. It feels like a real advancement to move up a layer of abstraction from plumbing to design.

Instead, I find the biggest reason to use Rust is the same reason to use a functional programming language: local reasoning and correctness.

Rust works because it enables users to write in an imperative programming style, which is what most people are familiar with, while avoiding to a degree the kinds of bugs that imperative programming is notorious for. Pure functional programming is an ingenious trick to show you can code without mutation, but Rust is an even cleverer trick to show you can just have mutation.

To me, Rust is the most well designed language for developer UX (that isn't a Lisp)(^1) because of it's commitment to locality, and a big reason for why it is able to do this is the ownership model. Yes I know that's a big claim, but if you read my previous post then you should know that I also think every object-oriented language (which are the languages every else seems think has good DX) is a horrible hell-spawn that will cause the collapse of modern western civilisation, and every civilisation after due to the amount of resources we have consumed that could never be replenished. Just a reminder that [Overshoot Day](https://en.wikipedia.org/wiki/Earth_Overshoot_Day) was two days ago ;)

(^1): I feel like whenever I argue a language is best at something I always have to add this disclaimer.

Speaking of OOP (and ignoring our certain demise), there's a common programming idiom in object-oriented languages called "Resource acquisition is initialization" (RAII) where objects should manage conceptual resources like file descriptors and sockets, and have destructors which clean up resource state when the object goes out of scope.

In other words, resource acquisition must succeed for initialization to succeed. Thus the resource is guaranteed to be held between when initialization finishes and finalization starts (holding the resources is a class invariant), and to be held only when the object is alive. Thus if there are no object leaks, there are no resource leaks.[^1]

RAII is a good way of making OOP suck less and is a commonly used resource management technique because it provides encapsulation as resource management logic is defined once in the class, not at each call site. Exception safety is also provided for stack resources (resources that are released in the same scope as they are acquired) by tying the resource to the lifetime of a stack variable (a local variable declared in a given scope): if an exception is thrown, and proper exception handling is in place, the only code that will be executed when exiting the current scope are the destructors of objects declared in that scope. And, locality of definition is provided by writing the constructor and destructor definitions next to each other in the class definition.

Resource management therefore needs to be tied to the lifespan of suitable objects in order to gain automatic allocation and reclamation.

Hey does that sound familiar? I know Rust doesn't have objects so you might need to replace objects with "all resources in general" and you've pretty much just described an ownership model.

Rust also enforces values to be "aliasable XOR mutable". Values can be mutated only if they are not aliased, and there is no way to introduce unsynchronized aliased mutation. It enforces a clear separation at all times between sequential state mutation on the one hand and references to shared (and generally immutable, except as provided for by explicit mutability mechanisms) state on the other. The only way to get this is through ownership and borrowing, the distinction between borrows and mutable borrows, and the aliasing rules between them.

In pure functional programming, you never have to bother your mind with unexpected side effects because there are no side effects. Rust instead gives you the vocabulary to carefully articulate *intended side effects*, preventing all other, unexpected side effects at the same time. And for this, you get to skip the overhead of treating everything as immutable. Not that this is an indisputable improvement for every use-case, but it's a novel trade-off and one that is definitely preferable in many domains.

To be clear, the borrow checker isn't the **only** reason Rust works. Many conscious design decisions have been made to help with local reasoning. Things like limiting type inference, and how exceptions are handled. And oh boy, I sure do love how exceptions are handled in Rust. I won't talk about it right now because it has nothing to do with the borrow che... no actually, I want to talk about it.

Rust generally solves errors in two ways:

- Unrecoverable errors. Once you `panic!`, that's it. Your program or thread aborts because it encounters something it can't solve and its invariants have been violated. E.g. if you find invalid sequences in what should be a UTF-8 string.
- Recoverable errors. Also called failures in some documentation. Instead of panicking, you emit a `Option<T>` or `Result<T, E>`. In these cases, you have a choice between a valid value `Some(T)/Ok(T)` respectively or an invalid value `None/Error(E)`. Generally `None` serves as a null replacement, showing that the value is missing.

With `Result/Option` the compiler can follow the normal, relatively straightforward path. If something fails, you're forced to check it via [exhaustively matching](https://doc.rust-lang.org/book/ch06-02-match.html#matches-are-exhaustive) over an `Option/Result` (or using the `?` operator) or explicitly turn it into a panic with operations like `.expect("Some crash message")` for example.

Result types force you to deal with the errors up front, and if the errors from lower level functions change your program won't compile. That's good, because you need to respond to the errors properly. Again, this is all in the name of local reasoning and correctness.

Okay, so I don't really know how to segue this back to being about the borrow checker. So just remember, next time Ferris tells you that you borrowed wrong, he's doing a good job that's important in order for Rust to be the way it is.

----

[^1]: https://en.wikipedia.org/wiki/Resource\_acquisition\_is\_initialization
