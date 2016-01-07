---
title: Linux Utilities
published_on: 2015-11-18
updated_on: 2015-11-18
tags:
 - linux
 - utility
---

## ps command

```
ps -eLo ppid,pid,lwp,psr,pcpu,command | egrep 'qemu|PID'
```

The string following option `-o` is the **STANDARD FORMAT SPECIFIERS**. Where:

 * `lwp` means 'light weight process (thread) ID of the dispatchable entity'. 
 * `psr` means 'processor that process is currently assigned to'.
 * `pcpu` for cpu usage.
 * `command` alias `args`, `cmd`

Note, if `lwp` is specified, `-L` option is needed.

> -L     Show threads, possibly with LWP and NLWP columns.

More specifiers see `man ps`


```
ps --cols 150 -eLo ppid,pid,lwp,psr,pmem,cmd | egrep 'qemu|PID'
```

`--cols` can be specified for better readability.
