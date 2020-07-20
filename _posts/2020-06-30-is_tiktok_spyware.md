---
title: Is TikTok Spyware? And The Value Of Proof
thumbnail: tiktok-thumb.png
category: infosec
---

If you were here last time, you may have noticed I mentioned that I probably won't  do infosec content anymore.

That did not last very long.

Today we're looking at some of the reasons people think TikTok is state-sponsored spyware. With it's ties to China, being a tool for global surveillance is not unlikely, but proving it is a different story.

This all started with a post on r/technology I saw called "[Guy Who Reverse-Engineered TikTok Reveals The Scary Things He Learned, Advises People To Stay Away From It](https://www.reddit.com/r/technology/comments/hgwe3c/guy_who_reverseengineered_tiktok_reveals_the)", which is a Reddit post linking to a post in a different website which cites a Reddit comment. We're going to skip the middle-man and go right to the source which is [here](https://www.reddit.com/r/videos/comments/fxgi06/not_new_news_but_tbh_if_you_have_tiktiok_just_get/fmuko1m/).

The comment by u/bangorlol has some bold claims like "TikTok is a data collection service that is thinly-veiled as a social network", and "they provide users with a taste of 'virality' to entice them to stay on the platform. Your first TikTok post will likely garner quite a bit of likes, regardless of how good it is".

This all makes sense, TikTok has always looked super shady to me, but this doesn't explain anything. Where is the proof? He's just all "trust me, I'm a nerd".

Recently he's edited the post with this at the top: "I'm getting a lot of DM's asking me to prove the majority of this with a paper and snippets of the offending code. I have a decent amount of my notes on my other laptop that recently had a motherboard failure and the majority of that data is on the laptop's SSD. It's a macbook pro, so recovering the data isn't exactly super simple. I have some frida scripts that I pushed to my git server as well as some markdown files + conversation logs I've had with exploit devs, but not much else. [...] I'm planning on putting up a simple site/blog with what I have and will be updating this comment with the link when it's done."

Looks like the average "dog ate my homework" excuse, but hopefully we'll see some of that stuff soon. At the bottom of the comment, he's added some more research by other people we can look at.

One of them is by [Zimperium](https://blog.zimperium.com/zimperium-analyzes-tiktoks-security-and-privacy-risks/), which is just them using their software to find "privacy and security concerns". Why should I trust Zimperium's automated reports without an explanation of what they are checking? Seems more like an advertisment to me. And in order to even look at it they ask me about my phone number, email, company, and name. Kinda ironic.

The other one is report by [Penetrum](https://penetrum.com/research) and is actually the reason for why I'm writing this post, and what the rest of the post will talk about.

Because this is the worst "research paper" I have ever read in my entire life. After reading all 21 pages of this pure, unfiltered garbage I actually became **angry**. How could something be this bad?

First of all, let's get all the "nitpicking" about presentation out of the way.(^1) On the page I linked look at the "TikTok Research" box and press the "details" button and download "Penetrum\_TikTok\_Security\_Analysis\_whitepaper.pdf". Okay, open it and tell me what the first thing you see is.

(^1): Presentation is actually really important in a report, I'm only calling it nitpicking to be nice.

Is it a fucking **480p JPEG** of their logo, with "Penetrum Security -- The Difference" written in text (and italicised) below it? That's the first thing you show us? Your subtext has to be written in the PDF instead of being a part of image because you couldn't afford a graphic designer? Jarring is an understatement.

Next, scroll down **one** page. Now what is it?

It's a typographic mess, that's what it is. Haha yes, center aligned titles! GOOD IDEA! On page 6 there's even a title at the bottom of the page where the actual content is on the next page! FUN! Why are the margins and font sizes so large? Could it be because there's no actual information and they're just padding? Spoiler: **it is**.

With all that done, we can actually get into it. The introduction has this line: "What if I told you that TikTok harvests an excessive amount of data and that this can all be proven right now?" Note the fact that this is the type of language you'd see in, I dunno... **this blog** and **not** a professional whitepaper/report. But I am interested in how all of this can be "proven right now". So yeah, maybe we should  "buckle up folks, it's about to get pretty wild", but for a different reason than they were probably hoping for.

Next page is the overview. I'm going to show all of the points here:

- 37.70% of known ip addresses linked to TikTok that were found inside of APK source code are linked to Alibaba.com; a Chinese sanctioned ISP located in Hangzhou.
- Alibaba’s privacy policy states that they share and distribute personal information of its users
- TikTok in itself is a security risk due to the following reasons;
	- Webview, and remote webview enabled by default
	- Application appears to take commands over text and receives them piping themdirectly into Java as an OS command
	- The application that uses Java reflection while decreasing VM load time can also be taken advantage of by malicious users and has a CVE score of 8.8
	- This application has been observed to log sensitive information such as;
		- Device information
		- User GEO location
		- Monitors user activity

This... this is not proof. We don't even have to read the rest of the report to know (but we will) that this tells us nothing.

"37.70% of known ip addresses [...] are linked to Alibaba.com; a Chinese sanctioned ISP". So what? It's a Chinese app, of course they're going to talk to Chinese IPs, and unless you can prove what is happening when they talk (they don't) this is useless information.

"Alibaba’s privacy policy states that they share and distribute personal information of its users". Again, so what? Literally everyone on this planet does that. It's still a bad thing of course, but we're going to need more than that.

The other points are about the security issues, which don't really explain anything about "data harvesting", but we'll burn that bridge when we get there.

We can actually skip the next two sections "Links to Chinese IP addresses" and "Alibaba’s Privacy Policy", because they don't actually say anything new in regards to their sentences in the overview. They basically just explain how they got the IP addresses and why collecting data is bad (not how much, or how they do it).

Next section is "TikTok and What Data is Collected". Finally, some information.

We're given a question: "when does extracting data hit the threshold of too much? Is it necessary for a mobile application to harvest the IMEI number of a phone, it's screen resolution, or the SIM card provider information? Is it normal for an application to have a section that enables tracking, collects GPS coordinates, and more?"

Personally, I think "extracting data" hits the threshold of "too much" the moment you start extracting data.

They then go on and talk about some of the APIs TikTok uses. There is a tracker named "AppsFlyer", which uses location data to produce location based advertisments and requiring the permission: `android.permission.ACCESS_FINE_LOCATION`. They look at the code which  "collects everything from the current OS version to running network events (WiFiSSID changes, etc), and even the IMEI number of the associated phone."

As they state, "the IMEI when used by trackers is usually used to determine whether an application is re-installed on a phone and give an analysis of other applications that are installed on the phone. Essentially, it creates an extremely realistic and graphic fingerprint of your phone which can be used to determine everything you have installed."

This is all correct when looking at the code they provide. The problem is that none of this is really any special. Facebook, Google, and Apple do all of this and a lot more. As terrible as it sounds, this is the bare minimum I expect them to do and doesn't really point to being "excessive" (when compared to other companies).

Well, that was everything they had on how TikTok supposedly harvests data. That was not very much. In fact, I don't think it was anything. The rest of it is about security issues, which we'll also go through in case they're interesting.

First up is the issue of executing of OS commands. They admit that it "is normal and understandable, but executing them from user input is less acceptable". Okay cool, so did they find it executing from userland?

"More research will need to be done in order to make a concrete determination if TikTok executes from user input."

Guess not. Why did they even put it in here?

Next is how "it also uses insecure cryptographic algorithms, such as MD5". That's practically all they say about it: "MD5 BAD". No mention of where it's being used or how there are still uses for MD5 even when it's a weak algorithm (e.g. checksums). Again, without more context this is a non-issue.

Finally we see an **actual** security problem. A very obvious vector for SQL injections on a `delete` query. Does this mean we'll start seeing real issues now?

Yes actually! Kind of. They talk about "hard coding API tokens in code [as] plaintext". Which is a less than ideal thing to do. But the example they show is from a Jira endpoint (im guessing from the `X-Atlassian-Token: no-check`, and `/issue/`), so it really doesn't seem like a big deal to me.

Next is use of webview and reflection. Gotta be honest here, I know nothing about Android development so I'm not going to be able to disagree with them when they say it's a big problem. Apparently there is "insecure use of SSL/TLS like ignoring SSL/TLS errors all together, reflection, or `REMOTE_DEBUGGING`."

That's all of it then. So what have we learned? An older version of TikTok (au fait,  they looked at versions 10.0.8-15.2.3) has some security issues and harvests as much data as everybody else.

Let me be clear, I don't like TikTok. This is not a defence of TikTok. The issue here is that, with such shitty proof, you could totally turn it into a defence of TikTok. It makes it a prime candidate for whataboutisms. You've seen me do them on this very post.

I think it is very likely that TikTok really is harvesting "excessive amounts of data", but I'll never be able say that I'm **certain** of it if we only have shit like this to back it up.
