# module/kubernetes/variables.tf
variable "node_count" {
    description = "Number of nodes to create"
}

variable "node_type" {
    description = "Type of the node (e.g., master, worker, load-balancer)"
}

variable "node_desc" {
    description = "Description of the node"
}

variable "node_memory" {
    description = "Amount of memory for the node"
}

variable "node_ip_base" {
    description = "Base IP address for the nodes"
}

variable "node_disk_size" {
    description = "Disk size for the node"
}

variable "template_name" {
    description = "Name of the template to clone"
}

variable "vm_password" {
    description = "Password for the VMs"
}

variable "ssh_key" {
    description = "SSH public key for the VMs"
}