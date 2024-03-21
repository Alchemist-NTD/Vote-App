#!/bin/bash
tar -cvf ./roles/remote-ansible/files/ansible.tar ../ansible
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook \
    -i ./inventory/hosts.yaml \
    -e "ansible_port=2223" \
    -e @vars/proxmox-vars.yaml \
    remote-playbook.yaml