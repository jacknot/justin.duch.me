---
title: Lockdown Thoughts: An Actually Good Anti-Gravity Racing Game
category: miscellaneous
date: 2020-07-16
thumbnail: antigrav-thumb.png
tags: videogames
description:
---

Here's a question for you. What do Wipeout, Redout, and BallisticNG all have in common?

They all suck.

Okay maybe that's a bit much. As arcade games they can be quite fun, but as racing games they lack the depth to be enjoyable. So today, we're going to discuss something I've wanted for a few years now, but have only started to seriously think about it during this lockdown period: what would an anti-gravity racing game with good racing look like?

First of all, what is my problem with the other games? Most ships in these games are very poor in terms of ship control. It very rarely feels like you are actually piloting the ship rather than gently suggesting where it should go. They are generally very understeer-y, and you can only make sharp turns through the use of airbrakes which do the complete opposite and become very oversteer-y. 

This makes close racing (where two ships are very close together) practically impossible as you will most likely end up hitting the other ship (and is why I'm assuming the ships are often equipped with some sort of shield). On top of all that, there is very little in terms of race strategy. 

While driving a racecar (let's use GT3 cars as an example) you have to think of many things: tire wear and track temperature, fuel load, your and your opponents lap times, your opponents race strategy, etc. We can also include things that are setup before the race even starts: break bias and pressure, ECU mapping, suspension, aerodynamics, traction control and ABS (for GT3 cars you can change these during the race), etc.

In comparision to Wipeout, you really only have to think about how fast you are going, and maybe when to pick boost or item pickups. This is fine for an arcade game, but it's not what I want.

So that's the first issue I'm looking to fix. Next is a bit more simple: how does any of this work?

How do the ships stick to the track and not fall of? ie. How does the anti-gravity work? How do the shields work? Why can you put weapons on your ship if people pilot them? That seems incredibly dangerous. How do the ships even turn or slow down without the airbrakes? I've not seen a single ship in any of these games with side/reverse thrusters. Does the anti-gravity just slow them down automatically? If so, that's really dumb. I've look through almost the entire [Wipeout wiki](https://wipeout.fandom.com/wiki/Wipeout_Central) and not found answers to any basic questions I've had.

These two problems are more related then you might originally think. A good idea of how the ships could work in real life can create massive changes in how they are controlled, and we'll be discussing all these as I get to them.

A few more things to note: this is a purely hypothetical game, I don't ever intend on making this (not that I could anyway), if an actual game developer is reading this, feel free to steal these ideas. 

This also isn't a "sim" in the sim racing sense, it's pretty hard to simulate technology that doesn't exist. And even if we could, I wouldn't want to. Just because something is accurate to real life doesn't make it good (eg. the dirty air from the wake of F1 cars making them hard to follow each other), it's still a game and I want it to play to the strengths of the medium where we don't always have to abide by the laws of physics. 

On that note, I'd like to talk about inspiration. It's very clear that Redout and BallisticNG take huge inspriation from Wipeout.(^1) However, we are trying to avoid the pitfalls of Wipeout style racing, meaning we shouldn't take cues from any of these games. We're going to start with the premise, "anti-gravity racing", and build the rest from scratch.

(^1): BallisticNG is described as a love letter to the original Wipeout trilogy in it's Steam store page.

However, we're not throwing all forms of inspiration out the window. While there are no other anti-gravity racing games to look at, there are other, similar games. The most obvious being the more simcade racing games like Gran Turisimo, but we can also look at space sims a la Elite Dangerous, which tries much harder than other games to depict a believable year 3306.

Those are probably what we should look at, but there's a certain game which design philosophy we'll take to help hone in on what we want first. Sorry if this is a bit long, but I've had five months to think about all of it and am only starting to write all of it down now, it might not be the most well structured piece.

The game is "The Legend of Zelda: Breath of the Wild". Yep, I'm talking about BOTW, I'm officially a YouTube game critic. One of the more memorable moments of playing BOTW was realising what made all of it "work": BOTW is nothing but a big state machine. It's all just state spaces interacting with each other. For example, early on you learn that dropping an apple next to a campfire cooks it. The state of the apple being uncooked is changed into cooked by interacting with the fire. Almost every item has interactions like these making Hyrule feel more like a living, **breathing** place.

Again the important thing here is that all of this is believable not accurate. It makes sense that fire would cook an apple, but if we were to attempt dropping one in real life like we do in BOTW it wouldn't work. In most games, if you wanted to cook an apple, a button prompt would appear over the campfire and pressing it would open a menu were you could insert the apple, then your character would probably do a cooking animation and after some time you'd get a cooked apple.

But why? Yes this is more accurate to real life, you probably need to actually cook the apple in a specific way and you can't just drop it near fire. But does this make the game better? Especially when there's only one animation and you're seeing your character do the same thing over and over again. The outcome is the same, you get a cooked apple.

BOTW has been able to make these complex interactions with so many of the items in the game exactly because they did the simple solution to cooking an apple. By doing this, I'd say that BOTW is a more enjoyable and real game than most.

A sim racing game will never be able to fully simulate the physics of the real world as long as games still run on classical computers that run simulations of Newtonian physics. They can get close and become good enough but they'll never truly get there. BOTW has a bunch of state systems interacting with each other to make a dynamic game, this is not how the real world works, because the real world is not a state machine, but it's enough to fool you into be immersed.

This is how the game should work: parts of the ship, the track, and even the weather should all affect each other in various and interesting ways, but not because it's accurate to real life but because it **makes sense**. Sometimes reality is a real bummer, but this is a game, and we don't need to be constrained by it.

With all that **finally** over, let's start. We're going to talk about specific parts of the game in the order I find most important. Hopefully we'll get a holistic view of it all at the end.

## Ship Design/Dynamics

According to our current models of general relativity, anti-gravity is impossible...

Oh.

But hey! Remember what I said about not caring about accuracy? What an easy cop-out! HAH! 

I'm joking, actually. Having proper anti-gravity opens up a whole bunch of other problems and I don't want to think about them. Instead we can create the illusion of anti-gravity with the most important part of the ship:

### The Mag-Plate

Magnets man, how do they work? I have no idea, so that's probably why I think using a "mag-plate" is fine. By using a big electromagnetic plate (shortened to "mag-plate") positioned at the bottom of the ship we can keep the ship "hovering" above our magnetic track. How far above the track should they be? Probably around 30mm to 80mm, even in our fantasy land of the future I doubt magnets are strong enough to pull/repel a heavy ship.

A neat thing about being so close to the track is that it means that the mag-plates on our ships are probably going to hit the track. When the plate scrapes the track we should then see pretty sparks like on an F1 car! But when an F1 car scrapes the ground it doesn't hit anything important, there's a piece of wood at the bottom of a specific density so as not to influence the height of the center of gravity too much. That wooden piece has titanium strips running along it to produce those sparks.

When our ship bottoms out it's going to be hitting the mag-plate, wearing it out and making it less effective. This means we'll need interchangeable mag-plates which we can swap out during a pit stop like with cars having to change tires.

### The Power Unit

How is the mag-plate going to be powered? You're going to need a whole heap of electric current to run through the coils of the plate in order to get it to stick.

The answer to that is nuclear fusion of course! Each ship will need a power plant to supply it with energy. They consume and fuse fuel (hydrogen atoms) to release the energy in the form of heat. This energy is converted into electricity. Like in real life, power plants are not 100% efficient at converting fusion heat into electricity, so some energy will be lost as waste heat and must be exhausted through radiation panels.

The hydrogen fuel is also probably going to run out, so refueling will be another thing we can do during pit stops.

Not only will the PU make electricity for the mag-plate (and other electrical components) but the fusion process will also produce helium in a highly-energized plasma state for the:

### Thrusters

This is probably the part of the ship that is going to be the most different to our other anti-gravity games. To fix a big pet-peeve I have with the others, we will give our ships reverse and side thursters. Reverse thrusters don't really need to be explained but ideally there would be three side thrusters on each side:

* The four at the front and rear of the ship will help turn the ship. E.g to turn left you use the front right and rear left thrusters which would spin the ship left.
* The two in the middle of the ship will help with strafing, because we can strafe our ships now! E.g to strafe right we'd either use the middle thruster on the left or all the thursters on the left.

This would actually make piloting a ship much more akin to piloting a ship in a space sim than in another anti-gravity game, which means your current velocity is going to be more important. The fastest way to change the velocity of your ship is to spin the ship in the direction you want to go and fire the forward thrusters (assuming they are the biggest and produce the most thrust). This also makes hitting the apex of corners quite interesting.

So, in order to quickly slow down your ship to hit a hairpin, it would be fastest to spin your ship 180 degrees and fire your forward thruster in the direction of the corner. Using the side thrusters to angle your approach, your ship should be facing backwards all the way until the tip of it hits the apex.

Something else to think about is what about when you are side-by-side with someone else? Is there going to be enough room to make a 180 degree spin?

And with only six side thrusters, there's something thing I've been thinking about: what if we could control these individually? When racing with a controller you'd use the thumbsticks to turn the vehicle. Applying this to our ship would mean that when you hold the thumbstick right it would spin the ship by using the front left and rear right thrusters, and to strafe maybe you'd use the other thumbstick or have a button to press to go into "strafe mode".

But what if you only want to use the front left because the corner isn't that sharp? But how would you even map that to a controller? I'm looking at my DS4 controller right now and it seems like each side has four face buttons. Hmm.

So here's the idea, (on a DS4 controller) we map: up, left, and down to the front left, middle left, and rear left thrusters and triangle, circle, and X to the front right, middle right, and rear right thrusters respectively. This leaves us with the left and square buttons free for us to use for other purposes.

A control scheme like this is probably going to be very alien to many people, but I'm incredibly curious as to how it would actually feel while playing. I'm pretty certain that if you could master it, it would make you a faster pilot simply because you get so much more control of the ship.

Ideally, a perfect controller would have these side thrusters mapped to analog buttons so you could change how much propellant goes into each thruster, but we need to deal with the cards we are given.

### Aerodynamics

Our ships are going to be raced in Earth atmosphere. Like all vehicles, aerodynamics is an important factor for drag reduction and downforce. Wait... downforce? Why do the ships need downforce if they are stuck to the track with the their mag-plates? 

First let's look at what we have so far. We have our mag-plate and several thrusters all sharing the same power source. It is very improbable that a small nuclear fusion reactor is going to be able to power both of these at their max potential, something is going to have to get the short-end of the stick.

So instead of solely relying on our mag-plate to keep the ship stuck to the track we can supplement it with some downforce. With the correct amount of aerodynamic downforce, as the ship speeds up, enough downforce will be made to lessen the need to supply power to the mag-plate. This gives the thursters more power, which makes the ship faster, which produces more downforce, etc... I think you get the idea.

Again, this changes the dynamics of cornering. As you slow down for a corner there's going to be less downforce so your thrusters will get less power as power gets directed to the mag-plate. This could also mean that we'll start seeing aero bits pop on on the sides and rear of the ship to help keep downforce as it spins.

### The Cockpit (or lack thereof)

There is no cockpit. I've debated about this for quite a while, but I think due to the speed at which these ships will probably travel it would be lethal for a human to be in them. Not only because of crashes, but because a human wouldn't be able to survive the amount of G-force generated by the ship.(^2) Instead they will be remote piloted with a camera attached to the ship.

(^2): With nuclear fusion, these things are going to be FAST.

Thankfully, this would allows us to be a little more creative with track design as we can completely throw any safety precautions out the window.

## Track Design

I think the track design in most anti-gravity racing games is fine actually. Personally I would just remove some the the random loops and jumps they feature, and call it a day. You could also narrow most of them, while also making the walls further away from the track to make it less punishing. So instead of having walls constantly on either side of the track we could add something analogous to grass or gravel in real race tracks. This could be a zone where the magnet of the track is weaker, requiring our ship to serve more power to the mag-plate.

There's a few things I think the others didn't take into account though:

### Location

Our anti-gravity racing ship is essentially a spaceship on rails, so why not make a track in space? Without an atmosphere to generate downforce, the mag-plate will need to have full power constantly, but it also means that we won't have a top speed, as there won't be any of those pesky air particles to slow us down. Who knows what **wacky** racing that could cause?

### Weather

Unlike racecars, our ships should be able to be piloted in any weather condition (maybe except hurricanes) as we use magnets to stick to the track instead of physically sticking to it with tires, making it impossible to lose control because of rain or snow. 

Although a big reason for why cars don't race in very heavy rain is also because the visibility decreases by a huge amount. We're actually building the technology to solve this right now: [LIDAR](https://en.wikipedia.org/wiki/Lidar). Our ships will come with LIDAR sensors to display an AR overview of the track and other ships to the camera feed, making visibility in the rain manageable.

## Gimmicks

Real life racing can often have several gimmicks intended to make the sport more enjoyable. E.g DRS in F1 (to help with overtaking), Formula E (all of it), etc. 

I don't really like DRS, but something like the boost button in LMP1 cars would be cool. There could be a battery in the ship with reserve power, you could then press a button to deploy that power to the mag-plate instead of getting it from the reactor. This would functionally have the same effect as an LMP1 car getting more horsepower from it's hybrid system as we all should know now that: reducing the amount of power going from the reactor to the mag-plate frees up power to go to the thrusters.

That's about it. I think there are some neat ideas here, but I'm neither a game designer nor am I very good at racing, so who knows? 
