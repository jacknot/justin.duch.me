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

resource "scaleway_registry_namespace" "nero" {
  name        = "nero"
  description = "Container registry"
  is_public   = true
}

resource "scaleway_k8s_cluster" "astolfo" {
  name        = "astolfo"
  description = "Blog cluster"
  version     = "1.21"
  cni         = "cilium"

  auto_upgrade {
    enable                        = true
    maintenance_window_start_hour = 0
    maintenance_window_day        = "any"
  }
}

resource "scaleway_k8s_pool" "ishtar" {
  cluster_id  = scaleway_k8s_cluster.astolfo.id
  name        = "ishtar"
  node_type   = "DEV1-M"
  autoscaling = true
  autohealing = true
  size        = 3
  min_size    = 1
  max_size    = 5
}

resource "scaleway_lb_ip" "mordred" {}
