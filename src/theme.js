'use strict';

const pathFn = require('path'),
      glob = require('glob'),
      fs = require('fs-extra');


var lookup = {};
const extToType = {
  '.css'  : 'css',
  '.js'   : 'js',
  '.jpg'  : 'img',
  '.jpeg' : 'img',
  '.png'  : 'img',
  '.svg'  : 'img',
  '.gif'  : 'img',
  '.webp' : 'img',
  ''      : 'res'
};


/*
 * Return the destination path of a file
 * based on it's extension
 */
function genPath(root, fname) {
  let bname = pathFn.basename(fname);
  let ext = pathFn.extname(bname).toLowerCase();
  let outDir = extToType[ext] || 'res';

  return pathFn.join(root, outDir, bname);
}


function Theme(config) {
  this._config = config;
}


Theme.prototype.init = function () {

  const cfg = this._config;
  let dstRoot = pathFn.join(cfg.output_dir, cfg.root);
  let len = cfg.output_dir.length;
  let theme_dir = cfg.theme_dir;
  if (!/\w\/\w/.test(theme_dir))
    theme_dir = pathFn.join('themes', theme_dir);
  let srcRoot = pathFn.join(theme_dir, 'assets');
  let files = glob.sync(srcRoot + '/**/*', {
                ignore: srcRoot + '/**/_*',
                nodir: true
              });

  // ensure dirs
  fs.ensureDirSync(pathFn.join(dstRoot, 'css'));
  fs.ensureDirSync(pathFn.join(dstRoot, 'js'));
  fs.ensureDirSync(pathFn.join(dstRoot, 'img'));
  fs.ensureDirSync(pathFn.join(dstRoot, 'res'));

  // move
  files.forEach(function (f) {
    let bname = pathFn.basename(f);
    lookup[bname] = genPath(dstRoot, f);
    fs.copySync(f, lookup[bname], { clobber: true});
    // overwrite lookup table
    lookup[bname] = lookup[bname].substring(len);
  });
}


Theme.url_for = function (file) {
  return lookup[file] || '';
}


module.exports = Theme;
