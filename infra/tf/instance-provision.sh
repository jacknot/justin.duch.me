#!/bin/bash
APP_NAME="blog"
APP_DOMAIN="justin.duch.me"
SSH_ADMIN="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJTdkpfXFqdawCRPlmOG2mBTRvMBJZMyhAbt1iG4x+HM justin@MacBook-Pro.local"

sudo apt update && sudo apt upgrade -y

echo "dokku dokku/vhost_enable boolean false" | sudo debconf-set-selections
echo "dokku dokku/web_config boolean false" | sudo debconf-set-selections

wget https://raw.githubusercontent.com/dokku/dokku/master/bootstrap.sh
sudo bash bootstrap.sh

echo "$SSH_ADMIN" | dokku ssh-keys:add jd_admin

dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=justin@duch.me

dokku apps:create "$APP_NAME"
dokku domains:add "$APP_NAME" "$APP_DOMAIN"
dokku config:set "$APP_NAME" DOKKU_PROXY_PORT_MAP="http:80:80"

# Assume the domain is already pointing to us
# dokku letsencrypt:enable "$APP_NAME"
