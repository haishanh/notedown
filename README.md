## notedown

_Turn your markdown files into beautiful well structured htmls_


[Demo][demo]

Checkout these [beautiful admonitions][admonition]


## Usage

```sh
git clone https://github.com/haishanh/notedown.git
cd notedown
npm install . -g

# if you don't want to install globally you can
cd notedown
# install dependencies
npm install
# link cli
npm link
```

Now you will have a command named `note`. To quick start


```sh
mkdir docs && cd docs
cp /path/to/repo/notedown/config.yml .
cp -r /path/to/repo/notedown/demo_notes .
ln -sf /path/to/repo/notedown/themes themes

# then you are ready to go

note build
note serve
```


[demo]: http://hanhaishan.com/notedown/
[admonition]: http://hanhaishan.com/notedown/test/admonition/

## License

Copyright (C) 2016 Han Haishan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.