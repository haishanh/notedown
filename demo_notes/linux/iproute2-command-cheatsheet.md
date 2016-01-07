title: iproute2 Command Cheatsheet
published_on: 2015-10-05
updated_on: 2015-10-05
---

## shorthand

```
ip route -> ip r
ip addr add -> ip a a
...
```


## Address

```
ip addr add 1.2.3.4/24 dev eth2
ip addr flush dev eth2
```

## Link

```
ip link set up dev eth2
ip link set up eth2
ip link set eth2 up
```

## Route

```
ip route add 1.2.3.0/24 dev eth2
ip route add default via 1.2.3.1
```

## Namespace

```
ip netns add ns1
ip link set eth2 netns ns1
ip netns exec ns1 ip link set eth2 up
ip netns exec ip addr add 2.2.2.2/24 dev eth2
ip netns exec ping 2.2.2.1
```

## veth

```
ip link add name veth1 type veth peer name veth2
ip netns add ns1
ip netns add ns2
ip link set veth1 netns ns1
ip link set veth2 netns ns2
```
