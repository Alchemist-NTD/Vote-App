# module/kubernetes/main.tf
resource "proxmox_vm_qemu" "ubuntu-22-04" {
    count = var.node_count

    name        = "${var.node_type}-${count.index + 1}"
    desc        = var.node_desc
    scsihw      = "virtio-scsi-pci"
    os_type     = "cloud-init"
    target_node = "proxmox"
    clone       = var.template_name
    cores       = 2
    sockets     = 1
    cpu         = "host"
    memory      = var.node_memory

    network {
        bridge = "vmbr0"
        model  = "virtio"
    }

    ci_wait    = 40
    ipconfig0  = "ip=${var.node_ip_base}${count.index + 1}/24,gw=192.168.1.1"
    ciuser     = "ubuntu"
    cipassword = var.vm_password
    ssh_user   = "ubuntu"
    sshkeys    = var.ssh_key

    disk {
        slot    = 0
        storage = "pve-2"
        type    = "virtio"
        size    = var.node_disk_size
        iothread = 1
    }

    connection {
        type     = "ssh"
        agent    = false
        user     = "ubuntu"
        password = var.vm_password
        host     = self.default_ipv4_address
    }

    lifecycle {
        ignore_changes = [
            network,
        ]
    }
}