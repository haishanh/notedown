'use strict';

const pathFn = require('path'),
      fs = require('fs-extra');

var lookup = {};

function Theme(config) {
  var fmap = {};
  fmap[config.theme_dir + '/resources/css/main.css'] = 
    pathFn.join(config.output_dir, config.root, 'css', 'main.css');
  fmap[config.theme_dir + '/resources/js/jquery-1.11.3.min.js'] = 
    pathFn.join(config.output_dir, config.root, 'js', 'jquery-1.11.3.min.js');
  fmap[config.theme_dir + '/resources/js/gumshoe.min.js'] =
    pathFn.join(config.output_dir, config.root, 'js', 'gumshoe.min.js');
  fmap[config.theme_dir + '/resources/js/mdnotes.js'] =
    pathFn.join(config.output_dir, config.root, 'js', 'mdnotes.js');
  fmap[config.theme_dir + '/resources/img/notes.svg'] =
    pathFn.join(config.output_dir, config.root, 'img', 'notes.svg');
  this.fmap = fmap;
  this._config = config;
  this._lookup = {};
}

Theme.prototype.init = function () {
  // move
  var extRe = /^([\S]*)(\.)(\w+)$/;
  fs.ensureDirSync(pathFn.join(this._config.output_dir, this._config.root, 'css'));
  fs.ensureDirSync(pathFn.join(this._config.output_dir, this._config.root, 'js'));
  fs.ensureDirSync(pathFn.join(this._config.output_dir, this._config.root, 'img'));
  for (var f in this.fmap) {
    let name = pathFn.basename(f);
    let out = extRe.exec(f);
    let ext = out ? out[3]:'';
    if (ext === 'svg') ext = 'img';
    fs.copySync(f, this.fmap[f], { clobber: true });
    lookup[name] = this._config.root + ext + '/' + name;
  }
}

Theme.url_for = function (file) {
  return lookup[file] || '';
}

module.exports = Theme;
