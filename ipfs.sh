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

# Remove unused files
find ./post -name '*.html' -not -path 'build/post/spe_*' -exec gsed -i '/type="svelte-data"/d' {} \;
find ./post ! -name post -type d -exec rm {}.json \;
rm post.json

# npm install -g all-relative
all-relative 1>/dev/null

cd ..
export NEW_CID=$(ipfs add -r --cid-version 1 build_ipfs | tail -1 | cut -d' ' -f2)
echo "New release CID: $NEW_CID"

curl "https://cloudflare-ipfs.com/ipfs/$NEW_CID/" > /dev/null
curl -X POST "https://ipfs2arweave.com/permapin/$NEW_CID"
