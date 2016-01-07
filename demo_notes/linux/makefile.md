title: Makefile snippet
tags:
 - linux
 - makefile
published_on: 2015-11-14
updated_on: 2015-11-14
---

Example

```
CC = g++ 
FLAGS = -Wall -lpthread
LIB_STDCPP = -lstdc++

all: test

test.o: test.c
    $(CC) -c -o $@ $^

test: test.o
    $(CC) -o $@ $^ $(FLAGS) $(LIB_STDCPP)

.PHONY: clean

clean:
    /bin/rm -rf test
    /bin/rm -rf test.o
```

Makefile:

 - `$@`: The file name of the target of the rule
 - `$^`: The names of all the prerequisites, iwth spaces between them.

More: see [here][make-automatic-vars]

gcc/g++:

 - `-c`: Compile or assemble the source files, but do not link.  The linking stage simply is not done.  The ultimate output is in the form of an object file for each source file.


## Condition

```
ifeq ($(shell uname),Darwin)
LD := gcc-apple-4.2
CC := gcc-apple-4.2
else
LD := gcc
CC := gcc
endif
```

[make-automatic-vars]: https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
