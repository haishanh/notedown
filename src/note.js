'use strict';

const path = require('path'),
  helper = require('./helper'),
  log = new helper.Logger(__filename);

function Note(file) {
  this.path = file;
  this.filename = path.basename(file); 
  this.name = path.basename(file, path.extname(file));
}

Note.prototype.render = function () {
  log.info('This is render method!');
};

module.exports = Note;
