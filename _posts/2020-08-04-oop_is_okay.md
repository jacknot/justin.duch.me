---
title: Things I Like About Object-Oriented Programming
thumbnail: oop-thumb.png
---

I hate object-oriented programming and I believe it to be the worst mistake the technology industry has ever made since von Neumann architecture.

There's a lot I could say when bashing on OOP and OOP related things. In fact, a month ago I spent a considerable amount of time writing a short essay in my team's Slack channel ranting about why I hate ORMs. It's probably a bit too short to be it's own post so I've cleaned it up a bit (Slack is not a good place to write essays) and you can just read all of it here.

> ORMs are poor abstractions of SQL. The documentation of all the major ORM libraries (in Pythonland at least) is filled with references to SQL concepts. Most introduce them without explaining their equivalents in SQL, while others treat the library as a set of procedural functions for generating SQL. An abstraction of SQL that requires you to understand SQL anyway is doubling the amount you need to learn: first you need to learn what the SQL you're trying to run is, then you have to learn the API to get your ORM to write it for you.
>
>
> Now, if your project does not need any relational data features, then an ORM will work perfectly for you, but then you have a different problem: you're using the wrong data store. The overhead of a relational data store is actually pretty big. This is a large part of why NoSQL data stores are so much faster. If your data is relational, however, that overhead is worth it: your database does not merely store your data, it represents your data and can answer questions about it on the basis of the relations captured, far more efficiently than you could in procedural code.
>
>
> For example, if you're working on a model that represents an electrical distribution system, these are not really records. They represent a vast set of complex interrelations. Of course there are still records, but in isolation, away from the complex relationship of say pole -> {location, type, maintenance history, conductors, insulator type}, and conductor -> {poles traversed, length, a end location, a end join type, b end location, b end join type, material, material batch number, power circuit carried} etc.
>
>
> Then your queries to "find all customers affected by the pole at these coordinates", requires joins through: pole, conductor, circuit, serviced area, customers, etc. We're moving rapidly to lots of complex queries which most ORMs will straight up not be able to handle gracefully and will eventaully start to break down.
>
>
> SQL is about relational algebra: the output of SQL is not an object but an answer to a question. If your object "is" an instance of X and "has" a number of Y, and each of Y "belongs to" a Z, what is the correct representation in memory of your object? Is it merely the properties of X, or should it include all the Ys, and/or all the Zs? If you get only the properties of X, when do you run the query to fetch the Ys? And do you want one or all of them? In reality, it depends: that's what I mean when I say SQL is the answer to a question.
>
>
> The idea of structuring data using relations is appealing because no subjective, up-front decisions need to be made about the access paths that will later be used to query and process the data. In other words, the representation of your data in memory depends what you intend to do with it, and context-sensitive representation is not a feature of object-oriented design.
>
>
> Many ORM layers are also notably bad at deducing joins, and will fall back to dozens of individual queries for related objects. Another large part of the abstraction leak around ORMs is around both the caching and that DB-level performance tuning. You have to understand what code is going to generate what queries so that, at the very least, you can tune them by adding in the appropriate indexes in the database.
>
>
> All of a sudden, you're living in SQL land, examining query plans, etc. But if you decide that the change you need to make is to the SQL itself, the ORM layer suddenly gets in your way: you either have to bypass the ORM layer to drop into raw SQL, which at worst is hard to do and at best tends to massively reduce the value proposition of the ORM framework, or you have to try to tweak your code to get it to generate the query that you want, which is often frustrating and far more difficult than just writing the SQL yourself.
>
>
> This is not all to say that you **have** to write raw SQL instead of using something more friendly. A lot of these issues are actually mostly caused by object-oriented languages just being bad. If we look at an equivalent framework in an actual good language like [Elixir's Ecto](https://github.com/elixir-ecto/ecto), we can see that these problems magically go away because we're doing normal, simple data mapping instead of "obJEcT rElaTiONal MAppiNg". Ecto is just a DSL for writing querys to map to SQL, made possible because of the simple data structures and guarantees of functional programming.
>
>
> Peewee on the other hand, sucks big ween. Why does it run 50 million queries if I just want to join two tables together? Why does it overwrite Python expressions? `|` is for bitwise operations not `or`!? We already have an expression for `or`: it's just `or`! WHY DOESN'T IT USE `or`!? WHY DOES IT USE `&` FOR `and`? THIS COMPLETLY GOES AGAINST THE RULES OF PYTHON! AT LEAST TRY TO MAKE YOUR DSL BE SOMEWHAT SIMILAR TO THE ORIGINAL LANGUAGE LIKE HOLY SHIT.
>
>
> And that concludes my essay on why we should rewrite everything in Elixir.

For context, we had used [Peewee](https://github.com/coleifer/peewee) for a previous Python project and were considering using an ORM for another one. Luckily our terrible experience with Peewee turned us away from it.

Also can we talk about singletons? I thought we all agreed that global (mutable) variables are a shit idea and we should avoid them at all costs. But noooooo, singletons are okay because they're a design pattern from the "Gang of Four"! That makes them good and you should use them everywhere you see!

NO! Stop using singletons! Adding unnecessary state to your program is already bad enough, and adding global state (because that's what you're doing when you make a singleton) should go against the Geneva Conventions.

But I digress, I'm not actually here to just bash OOP.(^1) Since OOP is so popular, it must have some good things going for it right?

(^1): Ignore the fact that it's all I've been doing so far.

It sure does! Let's talk about some of the things that make me hate object-oriented programming less.

The first thing is how well it modularises programs and manages code reuse. I'm not actually going to talk about any OOP languages because none of them are any good, but we will look at languages that take cues from them.

Keeping with the Elixir circlejerk, let's talk about `use`. In my opinion, Elixir has the best modularity of any functional language (that's not a Lisp) because of its inspiration from OOP in this regard (Elixir was made by a Ruby developer).

The `use` macro is frequently used as an extension point and allows you to inject any code in the current module and bring external functionality into the lexical scope, often other modules.

For example, in order to write tests using the ExUnit framework, you use `ExUnit.Case` module:

```elixir
defmodule AssertionTest do
  use ExUnit.Case, async: true

  test "always pass" do
    assert true
  end
end
```

Behind the scenes, `use` requires the given module and then calls the `__using__/1` callback on it allowing the module to inject some code into the current context. Some modules (for example, the above `ExUnit.Case`, but also `Supervisor` and `GenServer`) use this mechanism to populate your module with some basic behaviour, which your module is intended to override or complete.

Functionally, this is very similar to the how classes can inherit from each other in a bad language and would be somewhat equivalent to doing this in Python:

```python
import unittest

class TestIsTrue(unittest.TestCase):

  def test_pass(self):
      self.assertEqual(True, True)
```

However, note my use of the words "very similar" and "somewhat equivalent". The `use` macro obviously isn't the same as inheritance - how could it be when there are no objects in Elixir. Instead `use` is much more powerful than inheritance but also much easier to manage at the same time.

The previously stated "Gang of Four" design patterns book actively discourages against using inheritance and opting for object composition instead.(^2) This is because of how complicated the state of an object and how that state is accessed can become when it inherits from too many classes making the hierarchy a mess.(^3) By this I mean the amount of unseen side effects of any object function increases dramatically when it inherits from something else.

(^2): But they also say singletons are a good idea so who knows how much we can trust them.

(^3): It's been a while since I've read the book so I don't remember if that was exactly what they said. They did say not to use it though, and that was the first reason I remember. I'm actually probably getting confused with "Out of the Tar Pit".

But why is it that when Elixir does something similar then it's okay? That's an easy question to answer: it's not an object-oriented language, it's a functional language. There is no state to make complicated. You are only "inheriting" functions and you always know what those functions are going to do because this is a functional language mate! There are no side effects!

So that was about making things modular to ease code reuse. Another thing I like about OOP is... actually that was all of it. That was the only thing I like about OOP and it was kinda about how a functional language does it better.

But in all honesty, while I really don't think OOP is any good, I do think the ideas OOP brings can be good. The architectural pattern of [entity component systems](https://en.wikipedia.org/wiki/Entity_component_system) have been picking up steam in the game development world and is largely built on objects and multi-paradigm languages like Rust feature a slimmer set of object-oriented features, while avoiding some of the traditional OOP baggage.

I've never a major problem with OOP in Python (apart from ORMs) and I don't believe I have ever written a class before in JavaScript. So I don't think there's anything really inherently wrong with the paradigm and that the problem most likely stems from people overusing it, applying needless design patterns and adding unwanted complexity.

Java and C# just suck though, there's no hope for those languages.
