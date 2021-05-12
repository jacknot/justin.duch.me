---
title: The SvelteKit Migration
thumbnail: sveltekit-thumb.png
---

Another year, another blog change.

Okay, for real - **this** time is the last time. And I really mean it, I'm getting too lazy to bother with making changes and spending too much time trying to figure out how this blog should be built. I have plans for the far future, and it'll be hard to get those setup if this blog keeps changing.

But this was necessary. [Sapper](https://sapper.svelte.dev) the previous web framework I used, is being deprecated in favour of [SvelteKit](https://kit.svelte.dev). Obviously, I could have just kept with Sapper and it still would have worked fine, but I'd rather be using something that isn't deprecated when I get to those future plans.

Unfortunately, SvelteKit is still pre v1.0 which means a bunch of stuff is probably going to change in the future. But I've always found Svelte to be pretty stable, so hopefully there won't be **that** much to change.(^1) Maybe, I should have waited, but I'm very impatient and I was pretty excited for it's release.

(^1): Famous last words.

SvelteKit's docs give a pretty straightforward [migration guide](https://kit.svelte.dev/migrating) from Sapper. And it only took me a few hours to read SvelteKit's documentation and do a complete migration of this blog.

One of the things that caught me off guard was having to add `"type": "module"` to the `package.json`. Apparently, this enables ES Modules which forces you to use `import x from 'x'` when importing syntax, where before you could also use the CommonJS syntax of `const x = require(x)`. Not a big deal, it's better this way, but it was annoying having to change imports and exports in everything.

SvelteKit also uses client-side router that intercepts navigations (from clicking on links or the back/forward buttons) and updates the page contents (as opposed to the browser handling the navigation by reloading), even when you use the static site adapter and export everything into static files.

I hate this, this is a static site and a client side router makes it feels too SPA-like and sluggish. This site is hosted in Germany and I live in Australia so because of the latency, when I would click a link it would stay on the same page for ~1 second and then change (like a SPA). This was an easy change by adding `router: false` to `svelte.config.cjs`. Ultimately the time taken to load the page is about the same, but it feels more responsive when the browser actually loads the page.(^2)

(^2): Also having the navigation done on the client side implies that JavaScript is being used, and I'd prefer to keep my JS usage hidden ;)

With SvelteKit's SSR, it always [hydrates](<https://en.wikipedia.org/wiki/Hydration_(web_development)>) server-rendered HTML into an interactive page. I found that it was adding JS to pages where it wasn't being used at all on the client side, like `/post` and `/about`. Thankfully, you can add `export const hydrate = false;` to each of your pages where JS isn't being used to disable hydration.

You could also use the `hydrate` option in the `svelte.config.cjs` file, but that will disable JavaScript for every page (because the router is also disabled) and that was a no-no since I use JS on this page,(^3) and will use JS for the aforementioned "far future plans".

(^3): If you can figure out where (without looking at the source code), I'll give you a hand-full of... nothing. It's pretty obvious.

Anyway, those were all back end changes that nobody except me would have noticed. So I decided to do a few things to the front end.

The most obvious is that the `/post` route looks like this.

![image](https://cdn.halcyonnouveau.xyz/blog/img/sveltekit_post.png)

First, let's address the elephant in the room: ~~What is up with the inconsistent gaps between each post?~~ Why is there more French now?

I don't think there's **more** French, I've just added more words to the page. It's just that they're in French.

If you scroll down the page and pay attention to the gaps between each post, I hope you'll notice that they correspond with the intervals between the dates of each post. It's meant to directly visualise how much of a "gap" there is between each one (in both space and time). The page title's change from "articles" to "chronologie", was made to help clarify it.(^4)

(^4): No, this doesn't count as more French, "articles" is a French word so the French percentage has stayed the same.

Originally, I thought of going for an actual "timeline" view, separating everything by dates and stuff, but that became too cluttered and took too much space.

So really, I just thought it was an interesting idea (I haven't seen anyone layout their stuff like this before), and I liked it enough to keep it. It also will help to serve the ideas of the "far future plans", assuming these plans turn out how I'm thinking they will, if they ever become realised at all.

And the bar below the title of the posts are just the "read time". I didn't really think too hard about that one.
