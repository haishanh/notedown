'use strict';

function Category(name, config) {
  this.name = name;
  this.link = config.root + 'categories/' + name + '/';
  this.count = 0;
  this.notes = [];
  this._config = config;
}

Category.prototype.render = function (){
  // get template
  // build context
  // render
  // save file
}
