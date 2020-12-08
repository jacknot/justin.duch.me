---
title: DNS As A Database
thumbnail: dnsdb-thumb.png
category: programming
---

Hello, this is the announcement for my new revolutionary database: DNS TXT records.

Are you sick of how fast and reliable key-value databases like Redis and Memcached are?

Do you want your keys and values to have to be capped out at a combined length of 255 characters?

Do you want to be able to have multiple, identical keys because that totally isn’t a recipe for disaster?

Do you hate yourself?

It doesn’t actually matter what you answered to those questions because DNS as a Database (DAAB) is for everyone!

Right now [DAAB](https://github.com/beanpuppy/dns-as-a-database) is only available as a Python package and only works with the DigitalOcean API to edit the domain records, but I plan to add other languages and services in the near future[^1].

Let’s go through a quick tutorial right now to show you how **PRODUCTION READY** DAAB is. We’re going to make a small web app in Flask that stores our favourite waifus with a link to an image. Here are the routes we will have:

```python
#!/usr/bin/env python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Return a list of waifus
    waifus = []  # TODO
    return render_template('index.html', waifus=waifus)

@app.route('/<waifu>')
def show_waifu(waifu):
    # Return an image of the waifu
    waifu = {}  # TODO
    return render_template('waifu.html', waifu=waifu)

if __name__ == '__main__':
    app.run()
```

Okie, should be simple to finish. Let’s initialise DAAB first.

```python
import os
from flask import Flask, render_template
from daab import DAAB

app = Flask(__name__)
daab = DAAB(os.getenv('DO_TOKEN'), 'waifu.church')
```

We’re getting our DigitalOcean API key from an environment variable and setting the domain to ‘waifu.church’ which will be our “database” (as well as what we will host the site on).

Now let’s do the index route:

```python
@app.route('/')
def index():
    # Return a list of waifus
    waifus = daab.scan('*')
    return render_template('index.html', waifus=waifus)
```

We use the `scan` function to get all our waifus. `scan` takes one argument `pattern` which is a [glob](https://en.wikipedia.org/wiki/Glob_programming) we use to match the keys. But since we want all the waifus we just pass in `*` which will get everything.

The `waifu` route is just as easy:

```python
@app.route('/<waifu>')
def show_waifu(waifu):
    # Return an image of the waifu
    waifu = daab.get(waifu)
    return render_template('waifu.html', waifu=waifu)
```

`get` gets the waifu. This is an exact match, so no globs.

We will also need a function to add waifus to the “database”. Let’s put that at the end.

```python
if __name__ == '__main__':
    import sys

    if len(sys.argv) == 3:
        waifu = sys.argv[1]
        link = sys.argv[2]

        daab.set(waifu, link)
    else:
        app.run()
```

So now when we run the file, if we pass two arguments (the name of the waifu and an image link) it will add it as a TXT records otherwise it will run the web server. For example, to add our cute boy Astolfo:

```bash
./app.py astolfo https://i.redd.it/39mzvq7jjn341.jpg
```

This will create a TXT record that looks like this:

```
Type | Domain       | TTL     | Record
TXT  | waifu.church | 30 mins | astolfo=https://i.redd.it/39mzvq7jjn341.jpg
```

**Note:** You probably shouldn’t do it like this for real, I was just too lazy to make a new file.

That’s pretty much it, I’ve done the html templates in my own time because it’s boring. In summary here’s the entire application.

```python
#!/usr/bin/env python
import os
from flask import Flask, render_template
from daab import DAAB

app = Flask(__name__)
daab = DAAB(os.getenv('DO_TOKEN'), 'waifu.church')

@app.route('/')
def index():
    # Return a list of waifus
    waifus = daab.scan('*')
    return render_template('index.html', waifus=waifus)

@app.route('/<waifu>')
def show_waifu(waifu):
    # Return an image of the waifu
    waifu = daab.get(waifu)
    return render_template('waifu.html', waifu=waifu)

if __name__ == '__main__':
    import sys

    if len(sys.argv) == 3:
        waifu = sys.argv[1]
        link = sys.argv[2]

        daab.set(waifu, link)
    else:
        app.run()
```

You can view the finished product on [waifu.church](https://waifu.church), with the source code on [GitHub](https://github.com/beanpuppy/waifu.church).

You can also check out the TXT records for waifu.church using tools like [MXToolbox](https://mxtoolbox.com/SuperTool.aspx?action=txt%3awaifu.church&run=toolpage) online or the `dig` command on your machine.

---

[^1]: If you define “near future” as “never”.
