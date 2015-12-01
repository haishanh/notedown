'use strict';

const path = require('path'),
  swig = require('swig'),
  helper = require('./helper'),
  fs = helper.fs,
  log = new helper.Logger(path.basename(__filename));

function Category(name, config) {
  this.name = name;
  this.link = config.root + 'categories/' + name + '/';
  this.count = 0;
  this.notes = [];
  this._config = config;
}

Category.prototype.render = function (context){
  // get template
  // build context
  // render
  // save file
  var result;

  context.title = this.name + ' | ' + this._config.title;
  context.category = this;

  result = swig.renderFile(path.join(this._config.theme_dir,
                                         'templates',
                                         'category.html'),
                               context);
  fs.safeSave(path.join(this._config.output_dir,
                        'categories'),
              path.join(this.name,
                        'index.html'),
              result);
}

module.exports = Category;