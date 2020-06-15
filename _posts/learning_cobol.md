---
title: Learning COBOL
category: development
date: 2020-04-13
thumbnail: learning-cobol-thumb.png
tags: cobol
description:
---

“Over the weekend, New Jersey governor, Phil Murphy, made an unusual public [plea](https://www.northjersey.com/story/news/new-jersey/2020/04/04/coronavirus-nj-40-year-old-system-adds-delay-unemployment-checks/2944985001/) during his daily coronavirus briefing: The state was seeking volunteer programmers who know COBOL, a 60-year old programming language that the state’s unemployment benefits system is built on.”[^1]

Since then there’s been a whole lot of talk about COBOL including IBM now offering free [COBOL training](https://newsroom.ibm.com/2020-04-09-IBM-and-Open-Mainframe-Project-Mobilize-to-Connect-States-with-COBOL-Skills) to address overloaded unemployment systems, as well as launching a [forum](https://community.openmainframeproject.org/c/calling-all-cobol-programmers/15) where those with knowledge of the language can be matched with companies in need of help maintaining their critical systems.

I, being the mindless sheep who jumps on every new (or old) bandwagon, have decided that it’s now a great time to learn a 60 year old language. So let’s start with the setup.

We’re going to install Open Cobol (GNU Cobol) with the command `brew install gnu-cobol`. If you don’t have a Mac then you’re going to need to buy one then install Homebrew on it.(^1)

(^1): Or you could just find out how to install it on your OS by yourself.

To test if it works let’s write a “Hello, world!”, something people only started doing 20 years after COBOL was created. Open up your favourite text editor (which is Vim) and put this in:

```
       IDENTIFICATION DIVISION.
       PROGRAM-ID. hello-world.
       PROCEDURE DIVISION.
           DISPLAY “Hello, world!”.
```

Save it as `hello.cob` and run `cobc -x hello.cob`. This will compile it into an executable program called  `hello`. You can run it with `./hello` and should see the string “Hello, world!” displayed. With all that done, now we can actually go into COBOL.

COBOL programs are written in four separate divisions:

* IDENTIFICATION DIVISION: Identifies the following code entity and contains the definition of a class or interface.
* ENVIRONMENT DIVISION: Contains the configuration section and the input-output section. The configuration section is used to specify variable features such as currency signs, locales and character sets.
* DATA DIVISION: Six sections which declare different items: the file section, for file records; the working-storage section, for static variables; the local-storage section, for automatic variables; the linkage section, for parameters and the return value; the report section and the screen section, for text-based user interfaces.
* PROCEDURE DIVISION: Where the actual code goes. You can split these up into “paragraphs” which are just simple subroutines.

I find the `DATA DIVISION` to be very interesting. It’s basically a way for you to declare your data, which is something you’d use an ORM for (or you’d build some form of it yourself) in a more modern language. Here’s an example of a record I took from Wikipedia:

```
       01  some-record.
           05  num            PIC 9(10).
           05  the-date.
               10  the-year   PIC 9(4).
               10  the-month  PIC 99.
               10  the-day    PIC 99.
```

“Data items in COBOL are declared hierarchically through the use of level-numbers which indicate if a data item is part of another. An item with a higher level-number is subordinate to an item with a lower one. Top-level data items, with a level-number of 1, are called *records*. Items that have subordinate aggregate data are called *group items*; those that do not are called *elementary items*. Level-numbers used to describe standard data items are between 1 and 49.”[^2]

COBOL has built-in support for accessing flat file databases with either sequential or indexed organisation. COBOL doesn’t support any form of SQL-like “querying”, but you could still manually iterate through every record in a sequential file to find matching records. There are also extensions for accessing relational databases if you’d prefer that.

Another really interesting part of the `DATA DIVISION` is the `SCREEN SECTION`, which allows you to create user interfaces by declaratively describing them. It’s a description of labels, input fields, and display areas and where they appear on the screen (line, column). The COBOL program can reference the input fields and display areas as a variable. Typically you would use the `MOVE` statement to copy a value from a variable or a literal to the display variable.

This is honestly the easiest and most efficient way of creating user interfaces that I’ve ever seen. That might not seem like much considering I’m a web developer and most of my work involves an un-godly amalgamation of HTML/CSS/JS, but I still think it would be impressive even if you’re used to more sane methods of UI creation.

Here’s a very simple program to display two input fields.

```
        IDENTIFICATION DIVISION.
        PROGRAM-ID. screen-example.
        DATA DIVISION.
        WORKING-STORAGE SECTION.
        01 ws-customer-name   PIC x(20).
        01 ws-customer-amount PIC 99v9 VALUE zero.
        SCREEN SECTION.
        01 customer-screen.
           03 BLANK SCREEN.
           03 LINE 1 COLUMN 33 VALUE "Customer name".
           03 LINE 1 COLUMN 47 PIC x(20) USING ws-customer-name
                               PROMPT CHARACTER IS "*"
                               JUSTIFIED RIGHT.
           03 LINE 4 COLUMN 33 VALUE "Customer amount".
           03 LINE 4 COLUMN 49 PIC z9.9 USING ws-customer-amount
                               REQUIRED.
        PROCEDURE DIVISION.
        RUN-START.
            DISPLAY customer-screen
            ACCEPT customer-screen
            STOP RUN.
```

Copy it to a new file and try it out for yourself. You should the fields “Customer name” which accepts all characters and “Customer amount” which only accepts numbers. If you have a decent amount of knowledge in any programming language it would also be pretty easy to figure out what it’s doing.

Admittedly, it’s probably only easy because it’s limited to a terminal (and doesn’t have to deal with the hell-scape of internet browsers) but I still think it’s neat.

So far I’ve had a lot of praise for COBOL, much more than I expected. But does this mean I’ll join a COBOL cabal and disavow Rust? Nope, the only cabal I’m into is Haskell’s build system. And in COBOL, memory management is non existent because the memory layout is fixed at runtime.   Due to my Stockholm Syndrome from years of dealing with Rust’s borrow checker, I think this is bad and prefer being yelled at from my compiler.

There is a very big problem I have with COBOL, and that’s how code is structured itself (in the `PROCEDURE DIVISION`).

The `PROCEDURE DIVISION` is divided into paragraphs that start with a paragraph name and have a group of statements within the paragraph. A program starts at the first paragraph and continues sequentially through multiple paragraphs until a `STOP RUN` statement is executed or it executes the last statement in the last paragraph.

You can also  `PERFORM` on a paragraph which is sort of like a function call, but with no local variables. Or you can `PERFORM A THRU B` to jump to paragraph “A”, continuing sequentially until the end of paragraph “B”. Or you can `PERFORM A THRU B VARYING X FROM 1 BY 1 UNTIL C`, which is sort of like a for loop.

The nasty thing about all this is that when looking at a paragraph, you can’t tell anything about how it gets executed. Does it fall through to the next paragraph? You can’t tell. That’s determined dynamically at runtime. Is it a loop? Can’t tell. This is one of the things that makes large COBOL programs really hard to understand.

But wait there’s more! You know the `GO TO` statement right? Well, COBOL having it wouldn’t be that big a deal since lots of old languages have it. That’s until you read about the `ALTER` statement, which changes the target of a `GO TO` paragraph. So now on top of all the dumb stuff `GO TO` can lead to, when you  `GO TO A`, it can go to some other place based on a previous `ALTER` statement! Very cool, I love when I don’t know what my program does!

I think that’s all I needed to learn before I went: “yeah I don’t really want to use this language”. I can just **imagine** the horror of the legacy systems built with COBOL. I’ve had to do a bit of maintenance of an old Perl system and that was bad enough, a COBOL system would probably make it look like… uhhh… I actually can’t think of any large system I would consider well made and designed.

And speaking of legacy systems, let’s talk about the collapse of civilisation.

This all reminds me of Jonathan Blow’s talk “[Preventing the Collapse of Civilization](https://www.youtube.com/watch?v=pW-SOdj4Kkk)” from last year.(^2) It's probably one of the most interesting talks I've listened to. He argues that as we all start learning the higher abstracted technologies, the necessary knowledge needed to maintain these technologies will fade away (because nobody learns them) leading to total irrecoverable collapse.

(^2): Haha, if you’ve read my blog before I bet you thought I was going to talk about capitalism. But there’s already enough capitalism in COBOL code already.

So if you want one takeaway from this post, it’s this:

Learn electrical engineering instead.

---

[^1]: https://onezero.medium.com/our-government-runs-on-a-60-year-old-coding-language-and-now-its-falling-apart-61ec0bc8e121

[^2]: https://en.wikipedia.org/wiki/COBOL
