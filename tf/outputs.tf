output "astolfo_ip4" {
  description = "The public IPv4 address of the server"
  value       = scaleway_instance_server.astolfo.public_ip
}

output "astolfo_ip6" {
  description = "The default ipv6 address routed to the server"
  value       = scaleway_instance_server.astolfo.ipv6_address
}
