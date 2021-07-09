---
title: Attempting To Become Immortal With Web 3.0
thumbnail: web3-thumb.png
---

One day I'm going to stop paying for the infrastructure that this blog is hosted on, which means no one will be able to read this ever again. This is a huge problem for me because I'm a giant narcissist and I consider all my posts works of **art** so everyone should be able to read it whenever and long after I'm dead.

Currently, I archive all my posts on the Wayback Machine from the [Internet Archive](https://archive.org), which is a free service and that means not paying them doesn't make them remove my stuff. But I don't think this is enough since all their infrastructure is their own, and while I'm sure they will be around for a long time, there's always the chance that something could go wrong. I just don't think a centralised service is the best way to become immortal.

So far I've looked at IPFS, which I wrote a little about [here](/post/645dfc8b4b80108a9270468514a1d6b0492ea7ec1da1115668620e540f2a0516). It's certainly possible to host a static site like this on IPFS, but it isn't easy. So let's go through what I did.

Ideally, I wanted to be able to publish the site on IPFS without actually changing any of the posts (because I'm lazy). Which means any needed changes will have to be made during the build process through a script. Let's start writing that script now:

```
# remove old build
rm -r build_ipfs

# run svelte-kit build
npm run export

# svelte-kit has no options to build to a different dir
cp -r build/ build_ipfs/

cd build_ipfs
```

The first problem is with links.

Given the way that the `localhost:8080` and `ipfs.io` gateway works, absolute links don't work at all. If you try to re-host a website using them onto IPFS, all the absolute links will yank out the `/ipfs/` or `/ipns/` bit of the URL and replace it with just the linked path (which doesn't exist on the gateway). This is problematic because every link on this blog is an absolute link.

So now our new build process has to convert all the absolute links into relative links. And thankfully, there's an `npm` package for this: [all-relative](https://www.npmjs.com/package/all-relative) and now after the initial build we can run that. Let's add it to the script:

```bash
all-relative
```

The next problem is that JavaScript doesn't work. At all.

But that isn't actually that big of an issue for me. The Wayback Machine doesn't support it as well, and there aren't that many posts that need JS. I've put in some effort a while back to make sure this site worked without JS as well for a situation like this.

Next, we can add the build to IPFS.

```
cd ..
export NEW_CID=$(ipfs add -r --cid-version 1 build_ipfs | tail -1 | cut -d' ' -f2)
echo "New release CID: $NEW_CID"
```

Now we should be able to access it on the public gateway, for example using the CID outputted:

```
http://127.0.0.1:8081/ipfs/bafybeifuexczvwdwfbixzwrnaabann5dgwswesaj6noyhgeuedktvyeuma
```

Great, now this site is reachable on the public IPFS network. But, we've only uploaded our files using the local node. IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects may get garbage-collected regularly. Which means that when our computer goes offline, the website might no longer be reachable after it's cleared from other nodes' cache.

IPFS allows nodes to "pin" files which allows them to always keep the object somewhere. So technically, if enough people pin this website, it will never go down. But I don't think I'm famous enough for people pin this. Instead, most people use a "pinning service" like [Pinata Cloud](https://pinata.cloud).

This brings more issues however, one is that these services are once again: centralised, and pay-as-you-go, which just brings us back to buying infrastructure to host the blog. What we really want is something decentralised, and either free or paid upfront to store forever.

The answer is blockchain, because **of course** it is. What else were you expecting?

The [Arweave](https://www.arweave.org) blockchain can store and pin files onto IPFS to keep them available permanently. We're going to use an API from [ipfs2arweave](https://ipfs2arweave.com) which is also free, so that's cool. And we're also going to call the Cloudflare and [ipfs.io](https://ipfs.io) IPFS gateways first to speed up the propagation of our object.

```
curl "https://cloudflare-ipfs.com/ipfs/$NEW_CID/" > /dev/null
curl "https://ipfs.io/ipfs/$NEW_CID/" > /dev/null
curl -X POST "https://ipfs2arweave.com/permapin/$NEW_CID"
```

There's also [Filecoin](https://filecoin.io), which does a similar thing and is backed by IPFS. But I have bad memories of a job I had trying to get a Filecoin miner to work, so I don't really want anything to do with the project any more.

Lastly, we'll need to link the IPFS CID to a domain.

The standard way to address IPFS files using a DNS system is to use the so-called [DNSLink](https://docs.ipfs.io/concepts/dnslink/). It is a TXT DNS record that maps the website URL to its corresponding IPFS CID. But DNS has the pay-as-you-go problem we want to avoid (the longest I've ever seen a domain name bought for is 10 years).

Instead we'll be using ENS.

> The Ethereum naming service (ENS) is a decentralized way to address resources. Like DNS, which converts human-readable names to IP addresses, ENS converts human-readable names such as randomplanetfacts.eth.link to Ethereum addresses. These addresses can then be used to point to CIDs on IPFS. Without going into too much detail, ENS aims to fix some of DNS's problems, mainly man-in-the-middle attacks and scalability.

While you can only purchase an Ethereum for a limited amount of time, there is no limit to how long you can hold it (as long as you can pay for it). Right now buying the domain `peepeepoopoo.eth` (or renewing it, since it's already bought) for 1000 years will cost USD$5003.32. Linking it to an IPFS CID requires you to edit the `Content` record, which also has a fee attached for each time you want to change the CID.

ENS isn't the best solution however, its "decentralisation" is debatable as someone still owns the `.eth` TLD. On their [FAQ](https://docs.ens.domains/frequently-asked-questions#who-owns-the-ens-rootnode-what-powers-does-that-grant-them) they explain:

> The root node is presently owned by a multisig contract, with keys held by trustworthy individuals in the Ethereum community. We expect that this will be very hands-off, with the root ownership only used to effect administrative changes, such as the introduction of a new TLD, or to recover from an emergency such as a critical vulnerability in a TLD registrar.
>
> Since the owner of a node can change ownership of any subnode, the owner of the root can change any node in the ENS tree. This means that the keyholders can replace the contracts that govern issuing and managing domains (on .eth or any other top-level domain), giving them ultimate control over the structure of the ENS system and the names registered in it.

It's not perfect, but I don't think there's a better option. There also isn't really a way I could add this to the build script since it requires an Ethereum wallet, so I'll have to do it manually.

Overall, this was a very confusing experience that took me several days to figure out and I didn't enjoy a single second of it.(^1) The current Web 3.0 ecosystem offers some unique features that I actually am looking forward to exploring more, but it's still in a pretty rough state. It does **work** though, so that must count for something.

(^1): I spared you a story about how I attempted to fix a part of the "all-relative" package, but because NodeJS sucks major peepee I ended up 4 dependencies above and banging my head against "security vulnerabilities". I wasn't able to fix it.

Once the protocol gets faster, I think it would also be a good idea to replace my CDN used for images with IPFS. And I would actually like to find a way to do something like this that allows JS to run though, because that's where the real art on this blog is.

I'd also like to have somewhere that on this site that links to the current IPFS CID, but since that would technically change the contents of the blog, it would make a new CID so it would never actually be up to date.

Here is the entire build script for your reference:

```bash
#!/bin/bash
# Build and deploy to IPFS

# brew install --cask ipfs
if [ ! -f ~/.ipfs/api ]; then
  echo "IPFS daemon not running"; exit 1;
fi

rm -r build_ipfs
npm run export
cp -r build/ build_ipfs/

cd build_ipfs

find ./post -name '*.html' -not -path 'build/post/spe_*' -exec gsed -i '/type="svelte-data"/d' {} \;

# npm install -g all-relative
all-relative 1>/dev/null

cd ..
export NEW_CID=$(ipfs add -r --cid-version 1 build_ipfs | tail -1 | cut -d' ' -f2)

curl "https://cloudflare-ipfs.com/ipfs/$NEW_CID/" > /dev/null
curl "https://ipfs.io/ipfs/$NEW_CID/" > /dev/null
curl -X POST "https://ipfs2arweave.com/permapin/$NEW_CID"

echo "New release CID: $NEW_CID"
```

**Update 2021-07-09:** Okay turns out JS does work, but only through certain IPFS gateways like `ipfs.localhost` and `dweb.link` (and not on `cloudflare-ipfs.com` or `ipfs.io`). Luckily, the ENS domain directs you to `dweb.link` so if you go to [beanpupper.eth.link](https://beanpupper.eth.link), the JS should be running.
