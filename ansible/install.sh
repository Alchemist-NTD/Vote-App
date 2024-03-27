#!/bin/bash
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook \
    -i ./inventory/hosts.yaml \
    -e @vars/vsphere-vars.yaml \
    playbook.yaml