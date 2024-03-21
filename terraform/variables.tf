variable "pm_api_url" {
  type = string
}

variable "pm_api_token_id" {
  type = string
  sensitive = true
}

variable "pm_api_token_secret" {
  type = string
}

variable "pve_user_password" {
  type = string
}

variable "ssh_key" {
  type = string
}

variable "vm_password" {
  type = string
}

variable "template_name" {
  default = "ubuntu-2004-cloudinit-template"
}