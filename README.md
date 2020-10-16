# justin.duch.me

Bienvenue.

## About

Source code for [https://justin.duch.me](https://justin.duch.me).

## Development

### Requirements

* NodeJS 13.1.0+
* Yarn 1.19.1+

### Building

 To build and run the site locally:

```
git clone https://github.com/beanpuppy/justin.duch.me
cd justin.duch.me
yarn install
yarn start:dev
```

The site is now available at `http://localhost:3000`.

## CDN

Currently all images are hosted and linked to my CDN `cdn.halcyonnouveau.xyz`. I also keep a copy of all images in this repository here (under the same file structure), so if the CDN goes offline you can replace the links using `sed`. E.g

```bash
sed -i.bak 's/https:\/\/cdn.halcyonnouveau.xyz//g' *.md
```

## License

### Content

This includes images, text shown on pages, and other page content.

![cc-by-sa-4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0).


### Code

This includes all the html, css, scripts, and other code not part of the site content.

MIT (see [LICENSE file](LICENSE))
