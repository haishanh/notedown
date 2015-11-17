'use strict';

function Tag(name, config) {
  this.name = name;
  this.link = config.root + 'tags/' + name + '/';
  this.count = 0;
  this.notes = [];
  this._config = config;
}

Tag.prototype.render = function () {

}

module.exports = Tag;
