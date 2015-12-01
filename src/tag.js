'use strict';

const path = require('path'),
  swig = require('swig'),
  helper = require('./helper'),
  fs = helper.fs,
  log = new helper.Logger(path.basename(__filename));

function Tag(name, config) {
  this.name = name;
  this.link = config.root + 'tags/' + name + '/';
  this.count = 0;
  this.notes = [];
  this._config = config;
}

Tag.prototype.render = function (context) {
  var result;

  context.title = this.name + ' | ' + this._config.title;
  context.tag = this;

  result = swig.renderFile(path.join(this._config.theme_dir,
                                         'templates',
                                         'tag.html'),
                               context);
  fs.safeSave(path.join(this._config.output_dir,
                        'tags'),
              path.join(this.name,
                        'index.html'),
              result);
}

module.exports = Tag;
