module "jenkins-server" {
    source = "./module/ubuntu-22-04"
    node_count    = 1
    node_type     = "jenkins"
    node_desc     = "jenkins-server"
    node_memory   = 4096
    node_ip_base  = "192.168.1.3"
    node_disk_size = "32G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}

module "builder-server" {
    source = "./module/ubuntu-22-04"
    node_count    = 1
    node_type     = "builder"
    node_desc     = "builder-server"
    node_memory   = 4096
    node_ip_base  = "192.168.1.4"
    node_disk_size = "32G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}

module "sonarqube-server" {
    source = "./module/ubuntu-22-04"
    node_count    = 1
    node_type     = "sonarqube"
    node_desc     = "sonarqube-server"
    node_memory   = 4096
    node_ip_base  = "192.168.1.5"
    node_disk_size = "32G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}

module "argocd-server" {
    source = "./module/ubuntu-22-04"

    node_count    = 1
    node_type     = "argoCD"
    node_desc     = "argocd-server"
    node_memory   = 4096
    node_ip_base  = "192.168.1.6"
    node_disk_size = "32G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}

module "production-server" {
    source = "./module/ubuntu-22-04"

    node_count    = 1
    node_type     = "production"
    node_desc     = "production-server"
    node_memory   = 8192
    node_ip_base  = "192.168.1.6"
    node_disk_size = "64G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}

module "ansible-server" {
    source = "./module/ubuntu-22-04"
    node_count    = 1
    node_type     = "ansible"
    node_desc     = "ansible server"
    node_memory   = 4096
    node_ip_base  = "192.168.1.8"
    node_disk_size = "32G"
    template_name = var.template_name
    vm_password   = var.vm_password
    ssh_key       = var.ssh_key
}
