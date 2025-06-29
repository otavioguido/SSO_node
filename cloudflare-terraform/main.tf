# KV Namespace
resource "cloudflare_workers_kv_namespace" "my_kv_namespace" {
  title = var.kv_namespace_name
}

# Worker Script
resource "cloudflare_worker_script" "my_worker" {
  name     = var.worker_name
  content  = file("${path.module}/worker/worker.js")

  kv_namespace_binding {
    name = "MY_KV" # Used in worker.js
    namespace_id = cloudflare_workers_kv_namespace.my_kv_namespace.id
  }
}

# Variables for Route and Pattern
resource "cloudflare_worker_route" "route" {
  zone_id  = var.cloudflare_zone_id
  pattern  = var.route_pattern
  script_name = cloudflare_worker_script.my_worker.name
}
