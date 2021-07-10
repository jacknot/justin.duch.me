# justin.duch.me

Bienvenue.

## About

Source code for [https://justin.duch.me](https://justin.duch.me).

## Development

### Building

To build and run the site locally:

```
git clone https://github.com/beanpuppy/justin.duch.me
cd justin.duch.me
npm i
npm run dev
```

The site is now available at `http://localhost:3000`.

## Archiving Tools

- [dedlnk](https://github.com/beanpuppy/dedlnk)

Clojure tool to find dead links in `.md` files. Used to fix broken/dead links in every post.

- [scrplnk](https://github.com/beanpuppy/scrplnk)

Clojure tool to scrape all links off a website. Used to create a list of urls to batch process in [archive.org](https://archive.org/services/wayback-gsheets/).

- [ipfs.sh](https://github.com/beanpuppy/justin.duch.me/blob/master/ipfs.sh)

Shell script to add build to IPFS and pin on Arweave. IPFS mirror is available at [beanpupper.eth.link](https://beanpupper.eth.link).

## CDN

Currently all images are hosted and linked to my CDN `cdn.halcyonnouveau.xyz`. I also keep a copy them in this repository here (under the same file structure), so if the CDN goes offline you can replace the links using `sed`. E.g

```bash
sed -i.bak 's/https:\/\/cdn.halcyonnouveau.xyz\/blog//g' *.md
```

## Older Versions

Want to see older versions of this site? If you can use Docker, you can run them yourself here: [git.waifu.church/justin/old.justin.duch.me](https://git.waifu.church/justin/old.justin.duch.me).

## License

### Content

This includes images, text shown on pages, and other page content.

![cc-by-sa-4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0).

### Code

This includes all the html, css, scripts, and other code not part of the site content.

MIT (see [LICENSE file](LICENSE))
