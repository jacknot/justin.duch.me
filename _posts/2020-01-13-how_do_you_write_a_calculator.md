---
title: How The Fuck Do You Write A Calculator?
thumbnail: calculator-thumb.png
category: programming
---

Yo.

This is something I haven't done in a while. We're gonna look at code I wrote when I was a teenager in High School. During Year 11 we had a group project to write a calculator (with documentation). The documentation has been lost, but I found the code on an abandoned thumb drive in my pencil case. It took around an hour for me to get Visual Studio installed and figure out how to load the project, so I hope it was worth it.

Before we start I'd like to make one thing clear: I said it was a group project, but I did all the work. I mean that with no exaggeration, I did **all** of the work - all the code is by me. This isn't to diss on the other three people in the group, we decided it as a group because (and please excuse my brag) I was leagues ahead of everyone else in the class and they would just slow me down. As such, "our" calculator received full marks.

But make no mistake, while I was better than everyone else I was still a 16 year old. Looking back at it now it's pretty bad, I did a few things just to flex on everyone. Things like this:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_2.png)

Yes, That is a loading screen for a calculator. After I finished the core functions of the project, I got bored and started to add random crap to it. One of which is this loading bar, which is fake as you can see by the code for it:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_2_code.png)

If you don't know Visual Basic (it was required, I wouldn't use it personally), the progress bar has a timer and on every tick a value `ProgressBar1.Value` and the width of the bar goes up. When `ProgressBar1.Value` reaches 100 it goes to the next form (the actual calculator). I don't think I need to mention how bad of an implementation that is.

Alright, now once you've waited ~2 seconds for no reason we can see the actual calculator:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_1.png)

It looks like a calculator, I dunno what to say. If you look closely you will see that several things are misaligned and that's because I don't know how to align things. To flex my programming prowess even more, in the settings menu there is a option to turn on light mode. I forgot to take a picture of that so you're gonna have to imagine it, but here is the mess of code that implements it:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_1_code_dm.png)

This is actually to turn on dark mode, there is a separate (but almost identical) function to do light mode.

Now here's the function to do sin:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_1_code_sn.png)

I'm coming clean here: I've forgotten almost all of Visual Basic so I don't know if this is bad or not. My gut says it's bad, I'm not sure using the colour of a button is the best thing for a conditional operator but whatever. There isn't that much more to show here, it's actually kinda boring as I didn't see that many things that struck out to me in a "oh shit, why did I do it like that?" way.

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_form_1_code_eq.png)

This is the function for when you press `=`. It could be better, but it could also be **a lot** worse.

Now previously on ["How The Fuck Do You Write A Search Engine"](/article/how_do_you_write_a_search_engine) and [the other one](/article/how_do_you_write_a_blog), I attempted the project again to see if I could make it any better with more experience. I've done the same here:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/cal_good.png)
