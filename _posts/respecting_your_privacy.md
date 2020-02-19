---
title: Respecting Your Privacy
category: miscellaneous
date: 2020-02-18
thumbnail: privacy-thumb.png
tags: blockchain,blogpost
description:
---

You know that form at the bottom of every post that asks you to enter your email so I can notify you when there’s a new article?

**DON’T EVER USE THAT.**

Why would you trust me with your email? You don’t know what I do with it. How do you know that I don’t give it to the NSA so you can be on their watch list because any one who reads this dumbass blog should probably be on there. Do you think that saying “I promise I won’t spam you“ is gonna stop me?

That’s right. You don’t know.

But because I’m such a good boy, I’ve been looking for some solutions to this. How can I make sure you are confident I won’t do anything with your email?

**Spoilers:** I can’t. How am I supposed to email you if I don’t know your email?

I’ve looked at other databases like [GUN](https://github.com/amark/gun), which according to the GitHub page is “a realtime, decentralized, offline-first, graph protocol to sync the web.“ In less stupid terms: it’s a peer-to-peer database. Basically every user has a store of the database on their computer and it syncs up with other users (with magic or something).

While this would mean I wouldn’t be in complete control over the database, it would also mean everyone would have access to the database, and could see other people’s email (at least from my understanding, the documentation is not very clear).

Anyway, since I can’t really do anything here’s a few things you can do:

* **Use RSS:** Did you know I have a RSS feed? Click the RSS icon on the top right.
* **Create an email only for newsletters:** This is a good idea in general. There’s a few services you could use like [Newslettrs](https://newslettrs.app) or [SimpleLogin](https://simplelogin.io) to help.
* **Learn mind reading:** Whenever I publish a post, I think about it. So if you’re reading my mind you’d know.

That’s all from me. This has been a short post because I’m busy moving. It’s a giant pain to try and think of all the services I’ve signed up to where I have to change my address, and then change them. I swear we need some kind of user identity protocol.

Like let’s say everyone hosts (on their own computer) a “user identity server” where they put their name, address, phone and other stuff. Then services can subscribe to some parts of it (like maybe they only want your name and phone). So if you ever change your name or phone, you’d just need to update the server, and it pushes it to all the services subscribed.

Is it a giant privacy risk? I don’t think so, these services already have this information, it just makes it easier to change. Maybe it’s a security risk, since you have a single point of failure. Of course it’d be encrypted and stuff, you could also require two factor authentication (from a physical key), which is already better than what most websites do.

I guess the blockchain people wouldn’t like this though, since it still requires a lot of trust. But I want something easy that could fit in with our existing world, and let’s be honest, if we lived in a trust-less society there are much more pressing issues than whether some kid with a blog has your email address.

Like maybe you should be worried if food you ordered has been poisioned? Or if the car you just bought won’t spontaneously combust into a ball of flames, which is very bad for the environment.

Yeah, I’m not the biggest fan of blockchain. It seems like a lot of the problems a blockchain are said to solve, can just be solved with “make sure the big companies don’t do the bad thing”.

And blockchain people are just **so** annoying, **especially** cryptocurrency people. Holy shit why are you putting so much money in a technology you don’t understand (because a lot of these people definitely don’t understand it). Cryptocurrencies are so volatile as well, just put it your money in an ETF or something like a sane person. And you’re not even helping cryptocurrencies gain adoption because **you** are the ones making it volatile.

Nobody is going to use Bitcoin when they know it could become practically worthless without any warning. Or how about the fact that fraud is so easy because it’s unregulated[^1]?

Ah, I can hear the cryptocurrency evangelists screaming at me now.

“Justin you dumb shit, if you don’t like volatility use a stable coin tied to a fiat currency. If you’re scared of fraud, you can run auditing tools on the ledger to detect it.”

But hey, you know what else is tied to a stable fiat currency and is audited to prevent fraud?

**FIAT CURRENCY.**

“But the banks have too much power, we need a new unregulated currency to solve everyones problems!”

So stop giving the banks too much power. Maybe don’t bail them out when they cause financial crashes and let them deal with the consequences instead? Maybe start a revolution to create a stateless, classless, moneyless society? I dunno, just an idea.

Oh wait, this post was supposed to end like 400 words ago, whoops guess I got distracted.

---
[^1]: Remember when we talked about this? https://thenextweb.com/hardfork/2020/01/27/bitcoin-gold-51-percent-attack-blockchain-reorg-cryptocurrency-binance-exchange
