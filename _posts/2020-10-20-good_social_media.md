---
title: Lockdown Thoughts: Social Media That Doesn't Suck
thumbnail: social-media-thumb.png
category: miscellaneous
---

Previously I stated that the "Lockdown Thoughts" series ended because Sydney hadn't had any new COVID cases in a while. But two days after that we got 8 locally transmitted cases.

So that was short lived.

This isn't technically a "Lockdown Thought" because I've actually been thinking about it for years, but eh. Who cares? Today we're going to go through some ideas for a "perfect" social media site.

First let's get a little into what I want to get out of social media. A little fact about me is that I frequented random hacker forums from my early to late teens, which probably explains a lot about why I have these... [certain](/post/worker_coop) [opinions](/post/astolfo). I believe that these forums had a huge influence on my development as a person, and if we ignore all the terrible ideas I've been exposed to and internalised as my own(^1), the trait they implanted in me that I value the most was *curiosity*.

(^1): There are a lot of anarchist weeaboo hackers out there.

To me, the very basic and simplistic definition of a hacker is someone who has a stick, and pokes everything just to see how it reacts. Hacking is more of a mindset that can be applied to anything. All you need to do is look at something and say "how does that work?". I saw a lot of this in the write-ups and discussions of the forums I frequented. You were able to see people's though processes while banging their head against obfuscated code trying to reverse engineer it.

Even after I've stopped being as interested in computer security I still use the tools and frameworks these ~~sick fucks~~ fine gentlemen/gentlewomen taught me to reason about my work.

Okay this is a big digression, but to wrap it up: I value long form discussion as ways to learn new things. This is what I'm looking for in social media, which means I've already cut out the majority of the most popular ones(^2) and we're mainly left with the discussion board type sites.

(^2): Instagram/Twitter are not places for long form discussion, and you'd be an idiot if you thought otherwise.

The most challenging problem with these places, let's use [Reddit](https://reddit.com) as an example, is trying to cultivate quality and on-topic discussions. This usually requires having strict moderation to keep trolls out and removing low quality submissions. This doesn't always work however, most subreddits no matter how well moderated always become filled with low quality submissions as they get larger. I think that (but have no evidence of) this is because most people would be uninformed on a subreddit's topic, so as more people join, the lower the average knowledge of the subreddit becomes.

A similar and smaller site is [Hacker News](https://news.ycombinator.com), which is mainly a link aggregator for news in Silicon Valley (but other things of interest can be shared as well). Discussion here is of higher quality(^3) because the site is more niche and attracts less people, although in recent years it seems to be going the way of Reddit as it grows.

(^3): I don't actually have a very rigorous method for deciding what is "high quality" and I'm just going by how often I'll go "huh, that's interesting" when reading something from these sites.

Obviously you'd want your website to grow, but how can you do that without sacrificing the quality of discussions? [Lobste.rs](https://lobste.rs) makes their site invite only, which according to them "are used as a mechanism for spam-control, to slow registrations to a pace we can acculturate and to encourage users to be nice". This is a good solution in my opinion, your site won't be growing as fast and some people might get turned off by it, but that's clearly a good thing to keep quality discussions, and there are more benefits that we will get to later.

One thing all these sites have in common are the moderators who decide what's what. I don't like having dictator-like moderators. We're relying on the good will and trust of the admins/moderators of each site to keep it afloat. The moderators of each set the rules of whatever they're in charge of and the people have no say! If our rule is to have "high quality discussion", what constitutes as such is incredibly vague and hard to define. This make it ripe for abuse and censorship.

While the moderators on Hacker News seem to be doing a good job, and I don't think I'd be banned just because I don't like Paul Graham all that much, the anarchist in me would prefer to not use something where a few people have total control.

[Aether](https://getaether.net/) is one such attempt to solve this. It's a peer-to-peer application for self-governing communities with auditable moderation and mod elections. According to the docs, "you can actually disable the mods that you don't approve just for yourself, and those disables count as an impeach vote. If majority of the community agrees, the mod loses mod rights for a while for everyone. That makes it so that Aether communities are places where the content is what the current users of the communities want, not those who were there first by chance."

These are great ideas. I do love me some peer-to-peer architecture and democracy. Putting them in social media seems like a no-brainer. However, there are still some problems. The first is that peer-to-peer (or at least as it's implemented here) is slow, and content can take a very long time to load, but let's assume this will get better and ignore this. I'm not here to talk about software architecture, but about overarching design.

The actual problem is with... I can't believe I'm going to say this... the problem is... democracy ;( In a system like this, identities are very easy to create, which a Sybil attack, where an "attacker subverts the reputation system of a network service by creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence"[^1], makes easy to exploit.

Basically, if an attacker creates multiple accounts they could easily gain the majority voting power. To fix this, you could have a wait period between joining a community and being able to vote. But then you could just make the identities in advance.

Or you make voting eligibility a trailing indicator where it tracks past activity to be considered a "citizen" of that community. But how do you determine what activities count? Submissions and comments? Most people don't actually post anything very often so you might get a situation were only a few people who are not representative of the whole have the power to vote.

Also, both are easily subverted by people who buy and sell accounts. Thanks capitalism.

What we could do is use the invitation tree from lobste.rs. Obviously, it won't completely stop a Sybil attack as, once the attacker gets one account they can invite as many of themselves as they want (assuming we allow it, but I think people should have unlimited invites).

We can add to this a "chain of responsibility", where you are responsible for the behaviour of the people you invite. Let's say you invite some people and your tree looks like this.

```plaintext
beanpup.py (you)
├─ beanpuppy
├─ beanpup_py
├─ beanpupper
│  ├─ lemoncat
│  ├─ LeMansCat (banned)
│  ├─ lemonc.at
├─ beanpuppe.rs
│  ├─ lemon_catto
│  ├─ Gnippots
```

Since `LeMansCat` was found to be a bad actor and banned, their ban would go up the chain of responsibility to penalise `beanpupper`, you, and whoever invited you, decreasing in severity at each step up. The penalty could be just getting your invite ability revoked for a period of time. If multiple people you invited were banned, this would cause an even greater penalty and probably get you banned as well. There would obviously need to be some heuristics to determine what penalty someone would get a whatever level, but this would make people cautious about who they invite, which hopefully helps cultivate a better community.

This still isn't foolproof, heuristics could be difficult to determine and there's still the problem of buying people off(^4), in fact it might make it worse as people are incentivised to buy accounts beneath a person to get them banned, so unless we stay in a society that uses money **cough cough**, I don't really see how this could work. So let's look at something else.

(^4): Wow! Just like our real "democracy"!

I've said the I want to avoid having dictator-like moderators because of the potential for censorship. So what if we remove the ability to censor people? Now we can have **maximum free speech**.

No.

Bad idea. I don't want this to turn into certain green website. "In order to maintain a tolerant society, the society must be intolerant of intolerance."[^2]

And that's actually all I have. I've been thinking about this for years and I got nothing.

----

But...

I've been going through this entire thing assuming the worst possible thing is easy to do and would happen all the time. In computer security, people will often use [threat models](https://github.blog/2020-09-02-how-we-threat-model/) where they evaluate and validate the design and task planning for a new or existing service. This involves structured thinking about potential security vulnerabilities that could adversely affect their service.[^3]

Let's make a simple threat model for hacking democracy. We start with our threats and look for a solution to each.

- **Threat:** A random neckbeard who wants to take over our beautiful democracy with a Sybil attack.

**Solution:** Invitation tree with a chain of responsibility, the neckbeard will never get invited. And if they do, once swiftly banned, the person who invited them will be unable to do it again.

- **Threat:** The NSA takes over multiple peoples account to spread capitalist propaganda by buying or hacking them (maybe they have a weak password or something I dunno).

**Solution:** None, we're screwed. Move to Greenland and hope they don't find us.

Right, so our threats are some neckbeard and the NSA. And we can only defend against one of them. This seems like a lost cause.

But don't worry we're not done, let's take a dive into the mind of the NSA and ask a question: "would doing this be worth it?"

What is the value proposition of taking over this site?

If the site is big enough, we can dictate it's core values and just as those random hacker forums have shaped me, shape the people who use it. Basically: influence, we can influence the people who use it.

So let's say moderator elections are happening in our site with 100 members, there are two candidates and if no interference happens, votes will go 60/40. In order to get the guy with 40 votes to win you need to buy or hack 11 people from the other side. Probably not a big deal for the NSA right? But this is a site with 100 people... who cares about it? Is it really worth the effort? You aren't going to do much with 100 people.

Okay, what if there's a bigger target, 1 million members, same election, votes still go 60/40. Influence over 1 million people would be pretty nice. But now to get the guy elected you need an extra 100,001 members. Bof, that's quite a bit more work. Is it worth putting the resources into this when there are easier things to do (like helping destroy any vaguely communist country before they even start developing proper communism)?

I don't have the answer to this, I'd like to say that it isn't worth and it would require way to much work, but I'm not the NSA, another state actor, or just a group of people who want to mess stuff up.

There is one more threat I've been leaving to last because this one is a biggie.

- **Threat:** People don't care about the politics of some dumb site and thus, are easily outvoted or manipulated by bad actors through [astroturfing](https://en.wikipedia.org/wiki/Astroturfing) or some other means.

**Solution:** ...

Man, I really don't like how easy it is for me to be making these parallels to real life.

For real world politics, you'd try to explain to people why they should care, and how not caring affects the lives of so many other people (although most of the time this doesn't even work). I can't in good conscious do this for our imaginary website. It holds relatively little value in most people's lives, and there are way more important things to care about.

And honestly? I don't think even I'd care about the politics of this site. I just want a place where I can talk to other people about interesting things. I don't want to get into arguments about the ~~best~~ least worst moderator candidate every two posts.

Wait... candidate? This is a representative democracy! Of course it doesn't work! What we need is good ol' anarchist DIRECT DEMOCRACY **BABBYYYYYYYYYY**. It worked [last time](/post/worker_coop), surely it will work again!

Yeah nah. Still doesn't work, a direct democracy isn't going solve people not caring, and would actually require people to care more (as they would have to vote for more things), so a representative democracy might actually be better in this scenario.

So that's it, I guess. I give up. I don't know how to make social media good.

----

However, I don't like leaving my non-rant posts on a depressing end, so I'm going to go through some of the lesser known social medias that bring some interesting ideas.

[Retroshare](https://retroshare.cc/) is mostly considered a communication platform, but I'll count it anyway. It's a peer-to-peer (like Aether) and encrypted platform that's mostly aimed at connecting you with your friends instead of strangers. I don't believe it would work very well if you did actually try to expand your connections to strangers due to how you can't really moderate things on a peer-to-peer network (leading to the Paradox of Tolerance again).

Aether actually gets around this problem by also being on a blockchain (maybe I should have mentioned that earlier) because you can moderate a blockchain as long as every agrees that your chain (with someone being banned, or a submission removed) is cannon.

A lot of people have tried to solve the issue of being unhappy with moderators by just cloning the site and moderating it themselves. These clearly all have the same issue, even if the owner is a better moderator, but I'll leave some here in case you're interested. Lobste.rs is actually one such clone of Hacker News, and is open source so anyone can host their own version, such as the French [Journal du hacker](https://www.journalduhacker.net). You would also use a [Postmill](https://postmill.xyz) instance to replace Reddit, like [Raddle](https://raddle.me)(^5).

(^5): Just FYI, I don't visit Raddle very often (if ever), but most members there are very left leaning, probably more so than me, so don't visit if you get triggered over political opinions.

[Mastodon](https://joinmastodon.org) also probably isn't lesser known to the kind of person who reads my stuff, but I want to pad this post out. Basically it's federated Twitter. You know what federation is right? Oh cool, so I don't have to explain it. [Matrix](https://matrix.org) is the other known federated communication tool to replace things like Discord or Slack.

[Movim](https://movim.eu) is another decentralised attempt. It's federated like Mastodon and Matrix, but more horizontally branched. Where the others try to do one thing well, Movim does several things from chatrooms, to video, and blogs. The current servers seem to be just named after countries which is cool I think. I've always thought that it would be neat if my city spun up their own servers (of any federated service, not just Movim) for the residents to use. This could maintain some amount of connection to the real world while also providing a genuine service. It would feel more like a road or trash pick up service.

[Mobilizon](https://joinmobilizon.org/en/) is yet another federated tool for managing events, trying to be a replacement for other sites like meetup.com and the Facebook thing for events (I don't know what it's called). It's made by Framasoft who also make [PeerTube](https://joinpeertube.org) which is federated YouTube.

Anyway, that's all for today.

I'm serious, I'm not going to drag this on any more.

----

Wait what's that? You want to know why Astolfo is in the thumbnail at the top?

Well am I glad you asked!

It's because I got my Astolfo figma this week and I wanted to show you all! Look here he is helping me write!

![astolfo figma](https://cdn.halcyonnouveau.xyz/blog/img/astolfo-figma.png)

Il est tres mignon !

----

[^1]: https://en.wikipedia.org/wiki/Sybil_attack

[^2]: https://en.wikipedia.org/wiki/Paradox\_of\_tolerance

[^3]: https://github.blog/2020-09-02-how-we-threat-model/
