---
title: QEMU related
published_on: 2015-10-19
updated_on: 2015-10-27
tags:
 - virtualization
---

## QEMU examples

Start a VM with 3 nics, 3G memory, 4 cores.


```sh
qemu-system-x86_64 -enable-kvm \
                   -nographic \
                   -m 3G \
                   -cpu host \
                   -smp 4 \
                   -hda /home/haishanh/images/ubuntu-1504.qcow2 \
                   -netdev tap,id=hostnet0,script=no,downscript=no,vhost=on \
                   -device virtio-net-pci,netdev=hostnet0,mac=52:54:f6:f4:c0:a1 \
                   -netdev tap,id=hostnet1,script=no,downscript=no,vhost=on \
                   -device virtio-net-pci,netdev=hostnet1,mac=52:54:2d:32:2b:d0 \
                   -netdev tap,id=hostnet2,script=no,downscript=no,vhost=on \
                   -device virtio-net-pci,netdev=hostnet2,mac=52:54:75:5d:b1:bd \
                   -vnc :40 &
```

## Linux bridge basic command


```sh
brctl addbr br0
brctl addif br0 tap0
```

## OVS basic command

Config

```sh
ovs_prefix=''
ovs_db=${ovs_prefix}/etc/openvswitch/conf.db
ovs_db_sock=${ovs_prefix}/var/run/openvswitch/db.sock
ovs_db_schema=/usr/share/openvswitch/vswitch.ovsschema

mkdir -p ${ovs_prefix}/etc/openvswitch
mkdir -p ${ovs_prefix}/var/run/openvswitch
# create ovs_db
ovsdb-tool create ${ovs_db} ${ovs_db_schema}
# start server
ovsdb-server --remote=punix:${ovs_db_sock} \
             --remote=db:Open_vSwitch,Open_vSwitch,manager_options \
             --pidfile --detach ${ovs_db}

ovs_version=$(ovs-vsctl -V | grep ovs-vsctl | awk '{print $4}')
ovs_db_version=$(ovsdb-tool schema-version ${obs_db_schema})


ovs-vsctl --no-wait -- init  -- set Open_vSwitch . db-version=${ovs_db_version}
ovs-vsctl --no-wait -- set Open_vSwitch . ovs-version=${ovs_version}

# start ovs-vswitchd deamon
ovs-vswitchd --pidfile --detach
```

Add a vSwitch and add a port in it

```sh
ovs-vsctl add-br br0
ovs-vsctl add-port br0 tap0
```
