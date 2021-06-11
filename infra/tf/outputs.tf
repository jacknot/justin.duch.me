output "nero_endpoint" {
  description = "The registry endpoint reachable by docker"
  value       = scaleway_registry_namespace.nero.endpoint
}

output "astolfo_status" {
  description = "The status of the Kubernetes cluster"
  value       = scaleway_k8s_cluster.astolfo.status
}

output "astolfo_config" {
  description = "The kubeconfig of the Kubernetes cluster"
  value       = scaleway_k8s_cluster.astolfo.kubeconfig
}

output "ishtar_status" {
  description = "The status of the pool"
  value       = scaleway_k8s_pool.ishtar.status
}

output "ishtar_size" {
  description = "The size of the pool at the time the terraform state was updated"
  value       = scaleway_k8s_pool.ishtar.current_size
}

output "ishtar_nodes" {
  description = "(List of) The nodes in the pool"
  value       = scaleway_k8s_pool.ishtar.nodes
}

output "mordred_lb_id" {
  description = "The associated load-balance ID if any"
  value       = scaleway_lb_ip.mordred.lb_id
}

output "mordred_ip" {
  description = "The IP Address"
  value       = scaleway_lb_ip.mordred.ip_address
}
