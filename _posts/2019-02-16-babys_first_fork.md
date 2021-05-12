---
title: Baby's First Fork
thumbnail: fork-thumb.png
---

While thinking of new posts to write, I thought of a certain something that I believed I wouldn't be able to due to the fact the my articles are now converted to HTML from markdown now (instead of being written in HTML). But then I thought _'why don't I just write in the functionality myself?'_ So I've forked [python-markdown2](https://github.com/trentm/python-markdown2) and today we are going to add iframe support.

Looking at the code, it seems to be a pretty simple task. We just need to add an options to `self.extras` for iframes and call the function if it is passed.

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/fork-convert.png)

But first I'll need to decide on what syntax represent an iframe, since it isn't standard with markdown. I could add on to the normal syntax for links and add it to this `do_links` function:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/fork-links.png)

I would need to add a handler to this for iframes with a similar syntax. Where an inline image is `![text](image-url)`, I could make iframes to be `?[text](frame-url)`.

However, since it isn't actual markdown I would rather make the syntax something completely different like `\{frame-url}`, this will mean that I need to make a new function instead of adding it to an existing one.

Here we will add our option (in the previous `convert` function) to do iframes:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/fork-option.png)

And here's the code for `_do_iframes`:

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/fork-func.png)

Very simple.

Now we can add it to the bottom of this site's `requirements.txt` and add the iframes option to `mdtohtml`.

![image-alternative](https://cdn.halcyonnouveau.xyz/blog/img/fork-requirements.png)

To prove that it works here's a YouTube video:

![youtube-video](https://www.youtube.com/embed/lAIGb1lfpBw)

If you want to view or use this fork, you can [see it here](https://github.com/beanpuppy/python-markdown2). I'll hopefully continue to maintain it for as long as this blog lasts.

**Update 2019-08-27:** I don't use this anymore because I've moved from Python to JS.
