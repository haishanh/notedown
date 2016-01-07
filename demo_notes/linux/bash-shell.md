---
title: Bash shell scripting patterns
published_on: 2015-09-24
updated_on: 2015-10-27
tags:
 - bash
---
This note contains some Bash shell scripting patterns which I'm prefer. -haishanh

## getopts

```bash
#!/bin/bash

prog=`basename ${0}`

usage_exit()
{
  if [ ! -z "${1}" ]; then echo ${1}; echo; fi
  cat <<EOF
${prog} [-m SIZE] [-h]

${prog} by haishanh
    
    -m SIZE
        Specify xx size
    -h
        Show this help message
EOF
  if [ ! -z "${1}" ]; then exit 1; fi
}

while getopts :hm: arg; do
 case ${arg} in
  h) 
    usage_exit
    ;;
  m)
    echo "-m enabeld"
    echo "${OPTARG}"
    ;;
  \?)
    usage_exit "Oops, unkown arg..."
    ;;
 esac
done
```

## Transverse space seperated file

```
while read _ mnt fstype options; do
  echo $fstype $options
done < /proc/mounts
```

## Grouping commands

```
[ "$IPADDR" ] || [ "$HOSTNAME" ] || {
  echo "ip addr"
  echo "or hostname is needed"
  exit 1
}
```

## Trapping signals

```sh
#!/bin/bash

do_cleanup()
{
  echo "Clean up"
  exit 1
}

trap "do_cleanup" INT EXIT

for i in {1..100}; do
  echo -n "${i}%"
  echo -ne "\r"
  sleep 0.5
done
```
