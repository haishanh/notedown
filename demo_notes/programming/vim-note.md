---
title: VIM note
published_on: 2015-10-19
updated_on: 2015-10-27
tags:
 - vim
---
## replace / substitute
see [vim wikia search and replace][vim-wikia-search-replace]

`:s/foo/bar/g` 替换当前行所有foo
`:%s/foo/bar/g` 替换所有行所有foo
`:5,12s/foo/bar/g` 替换[5,12]行所有foo


!!! note
    [1,3]表示第1,2,3行，(1,3]表示第2，3行，(1,3)表示第3行。 

[vim-wikia-search-replace]: http://vim.wikia.com/wiki/Search_and_replace
