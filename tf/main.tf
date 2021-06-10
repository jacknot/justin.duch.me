terraform {
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = "2.1.0"
    }
  }
}

provider "scaleway" {
  zone   = "fr-par-1"
  region = "fr-par"
}

resource "scaleway_instance_security_group" "ishtar" {
  name                    = "ishtar"
  inbound_default_policy  = "drop"
  outbound_default_policy = "accept"

  inbound_rule {
    action = "accept"
    port   = "22"
  }

  inbound_rule {
    action = "accept"
    port   = "80"
  }

  inbound_rule {
    action = "accept"
    port   = "443"
  }
}

resource "scaleway_instance_ip" "public_ip" {}

resource "scaleway_instance_server" "astolfo" {
  name              = "astolfo"
  type              = "DEV1-S"
  image             = "ubuntu_focal"
  ip_id             = scaleway_instance_ip.public_ip.id
  enable_ipv6       = true
  security_group_id = scaleway_instance_security_group.ishtar.id

  user_data = {
    cloud-init = file("${path.module}/instance-provision.sh")
  }
}
