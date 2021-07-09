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
