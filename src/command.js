'use strict';

function build() {
  console.log('Building...');
  var Note = require('./note');
  var n = new Note('./what-about-this.md');
  n.render();
}

function serve() {
  console.log('Serving...');
}


module.exports = { 
  build: build,
  serve: serve
};
