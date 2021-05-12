---
title: Vim Clutch Improved
thumbnail: vim-clutch-thumb.png
---

Using foot pedals as an input device aren't a new idea. For transcribers, a foot pedal can be considered an essential tool. Using one means keeping your hands focused on fewer tasks and maintaining greater productivity. While transcribing, people often use them to pause, rewind, and fast forward audio recordings.

This means you can use keystrokes for standard typing and not have to worry about additional "hotkey" commands to control audio functions, and using fewer keystrokes also generally improves your writing speed.

I don't really know what goes into looking for a good foot pedal for this process, but I've seen several pedals go over $100 like the [Philips ACC2330](https://www.pacifictranscription.com.au/product/philips-acc2330-usb-4-pedal-foot-switch/) which is $195. This probably means that there must be some very small but vocal community of transcribers out there somewhere, so I'm going to stop talking about this before I get something wrong and they start cancelling me.

[Vim Clutch by Aleksandr Levchuk](https://github.com/alevchuk/vim-clutch) is an attempt at using a foot pedal for text editing in Vim. It's a quick read, but in case it ever gets taken down for some reason (who _knows_ what the reason could be, the Internet is a wild place these days haha), I'm going to summarise it here.

Basically, they bought 2 cheap $10 programmable pedals and tried to make it so that when the pedal is pressed down, the pedal types `i` which puts Vim in "insert" mode and when it is released, it types `<esc>` putting it back to "normal" mode.(^1)

(^1): I'm assuming you know how Vim works, so I'm not going to explain modes.

One of the problems was that only the "pedal down" event could be programmed, so they then took both pedals apart and used **incredibly complicated electrical engineering that no mere mortal could possibly understand** to take the sensor out of one pedal and put it into the other, giving them one pedal that can be programmed on the press+release and some junk plastic.

This is all well and good. It seems like it could be pretty useful, like with how transcribers use them.

There is a one problem however. I'm a member of the very small but vocal sim-racing community, and I have to say that this **makes no sense** and I want Aleksandr Levchuk **CANCELLED**.

Why is it called Vim Clutch?

If anything it acts more like a car's throttle pedal instead of it's clutch pedal, where being in insert mode let's you add more text, with which I could vaguely make analogies to a car accelerating if I bend the facts enough.

In a car,(^2) the clutch pedal is for disengaging the clutch so a different gear can be chosen. So really, when you press the "clutch" down it should go into "normal" mode where you can then chose which "mode" or "gear" to go into.

(^2): I'm talking about the good cars with a manual transmission and three pedals. Pro tip: every car with two pedals is a crap box and not worth any attention.

Now you might say:

"Are you kidding me Justin? This isn't about cars, those transcribers don't pretend their pedals are for cars, why are you doing this?"

**IT BECAME ABOUT CARS WHEN "CLUTCH" WAS PUT IN THE TITLE YOU INSOLENT FUCK.**

Anyway, today we're going to do this better.

Instead of that crappy on/off switch type foot pedal, I have proper 12 bit resolution Fanatec CSL Elite Pedals with the Loadcell Brake extension, which uses **glorious** potentiometer sensors to give 16 bits for **optimum breaking performance**. And it's also made out of **full-metal aluminium** instead of that **shitty** plastic that turtles are going to choke on, because if a turtle tried to eat my pedals they will break their mouth.

![pedals](https://cdn.halcyonnouveau.xyz/blog/img/pedals.jpg)

Don't ask how much they cost and ignore the cables.

Since I have three pedals, this means I can map them to more Vim commands, which means I can write better, and that makes me a better person (in general).

If you disagree, at the end of their document, Levchuk says something about ordering a "triple version" of the pedal, but they haven't done it yet and it's been over 9 years, so I don't think it's going to happen. This makes me pretty confident in my statement.

But since we're here, let's see what Levchuk wanted to do with three pedals.

> PC Sensor also has a triple version of the pedal. I will order two of those as well. I will program:
>
> - The left pedal to "I" - insert at the beginning of the line
> - The middle pedal to "i" - regular insert mode
> - The right pedal to "A" - insert at the end of the line

I am so mad right now, I'm actually **shaking**.

Not only did they have the **nerve** to call the "clutch", "break", and "throttle" pedals "left", "middle", and "right" instead, **all** of them are for going into normal mode (which we **all**(^3) agreed is analogous to accelerating). So these pedals would all be throttles! I'm going to cry.

(^3): Yeah, we all did. I saw you agreeing back there!

To fix this, we can use our **proper sim-racing** pedals with a program called [JoyToKey](https://joytokey.net/en/),(^4) which gives us a GUI to allow a game-pad (or our pedals) to emulate the keyboard.

(^4): It's $7 with a free trial, but it's the best one I've found which let me do this.

First, let's fix "Vim Clutch" and put it on the actual clutch pedal. For me, JoyToKey has my clutch on the horizontal axis of "Stick 2" (I don't think this program is really designed for pedals, but I am impressed that it worked for me without any setup).

So, if you open the "Stick 2: ->" button assignment and go to the "Keyboard (Multi)" tab you'll see this.

![joytokey 1](https://cdn.halcyonnouveau.xyz/blog/img/joytokey-1.png)

Make sure to check the button at the bottom that says "[Input1] when the button is release (and [Input2] when it's pressed)", we're going to use this for all our bindings.

Now we can add binds for "Input2" to become `<esc>` and "Input1" to be `i`, reversing the original Vim Clutch by making it an actual clutch. Now when we want to go into "normal" mode we press the clutch, and when we go into "insert" mode we release it.

The thing is though... I actually spend most of my time in "normal" mode, which means I'm going to have the clutch pressed most of the time, and that doesn't make sense from a car perspective.

So change of plans, we keep the original Vim Clutch but move it to the throttle pedal. This also means it should be renamed to **Vim Throttle**.

Now we can map the break pedal to... uhh... we can map it to "backspace"? But that makes it more like a "reverse" pedal, which doesn't exist. Okay, let's think through this: breaking, breaks, stopping, quitti- **[HOW DO YOU QUIT VIM?](https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor)** Of course!

We can map the break pedal to `:q`, and now I won't have to refer to that StackOverflow question every time I want to quit!

No, I'm kidding of course, that would be ridiculous. Maybe we can have `:` on "Input2" (when pressed) and `<enter>` on "Input1" (when released), so it's easier to type commands like `:q`.

And finally, the clutch pedal. Hmm. Maybe "visual" mode? I can't really think of anything. I haven't even been able to use the full 12/16 bit resolution of these pedals. It's almost as if there isn't that much you do with pedals made specifically for sim-racing, and that you can't really apply the process of driving a car to a 30 year old modal text editor.

Which just means we need a new text editor.

So, let's brainstorm a new, perfect text editor. One that doesn't just use the pedals, but our entire sim-racing rig.

On the screen will be a horizontal list of characters, and you use your Fanatec ClubSport Steering Wheel Formula V2 connected to your Fanatec Podium Wheel Base DD1 to select a character by turning the wheel left or right.

The carbon fibre construction of the ClubSport wheel, will make those rotations a breeze, and you could even have the selected character shown on it's LED display. The Podium Wheel Base is there to provide responsive and realistic feedback when doing any action with it's first-class direct drive motor.

Pressing the throttle scrolls the cursor to the right, and wraps to the next line when it gets to the end of the current line (and back to the top of the document when it gets to the end). With the 12 bit resolution of the Fanatec CSL Elite Pedals, you'd even be able to granularly change how fast it moves.

The character selected by your wheel is inserted automatically every few seconds (depending on your RPM), so you use your break pedal to completely stop the insertion. Once again, with the 16 bit resolution of the Loadcell Brake extension for your Fanatec CSL Elite Pedals, you get even more options on how much breaking force you can apply.

You can change modes with your Fanatec ClubSport Shifter SQ when the clutch is pressed in. Vim only has three modes, but the Fanatec ClubSport Shifter SQ uses a 7 gear H-pattern layout, which means we can have 8 modes (including reverse)!

Does this make any sense? No. But, if the sim-racing community has taught me anything, if I can become a better driver by buying more expensive gear, then surely I'll get better at text editing too! And besides, now you can [heel-toe](https://en.wikipedia.org/wiki/Heel-and-toe_shifting) in your text editor.

This post is not sponsored by Fanatec.
