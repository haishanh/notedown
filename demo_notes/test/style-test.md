---
title: This page is used for style
published_on: 2015-10-19
updated_on: 2015-10-27
tags:
 - 样式
 - style
 - test
---
## List

### Unordered List

 * [Google][google]
 * [Apple][apple]
 * [Twitter][twitter]

### Ordered List

 1. one
 2. two
 3. three

### Links

This page is generated using [mdnotes][mdnotes].

### Quote

> Here’s to the crazy ones. The rebels. The troublemakers. The ones who see things differently. While some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.  

### Code 

Some python code

```python
def hello():
    print('Hello')

if __name__ == '__main__':
    hello()
```

Some javascript code

```js
var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
}).listen(8000);
```

### Inline code

Test `inline` code.

`close` `together`

### Image

Text above

![](http://7fva40.com1.z0.glb.clouddn.com/carlog-404-sprite.jpg)


### Some keyboard

<kbd>CTRL</kbd> + <kbd>SPACE</kbd>

### 中文

我能吞下玻璃而不伤害身体。

### This is simply a long heading to test table of content on the left

nothing here

### Admonition

!!! note "This is a note"
    Hello I'm a note.


[twitter]: https://twitter.com
[apple]: http://apple.com
[google]: http://google.com
[mdnotes]: http://github.com
