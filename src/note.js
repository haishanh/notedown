'use strict';

const fs = require('fs'),
      path = require('path'),
      helper = require('./helper'),
      log = new helper.Logger(path.basename(__filename));

var reFrontMatter = /^(-{3,5}\s*?\n|\s*)(\S[\s\S]*?\n)(-{3,5})/;


function splitFM(s) {

}

function Note(file) {
  this.path = file;
  this.filename = path.basename(file); 
  this.name = path.basename(file, path.extname(file));
}

Note.prototype.render = function () {
  log.info(`Rendering ${this.path}`);
  var fileContent = fs.readFileSync(this.path, 'utf-8');
  //console.log(fileContent);
  var match = fileContent.match(reFrontMatter);
  console.log(match[2]);
};

module.exports = Note;
