'use strict';

const chalk = require('chalk'),
      path = require('path');

var fs = require('fs');

// Logger
function colorPrt(level, prefix, str) {
  var color = levelToColor[level];
  var time = (new Date()).toTimeString().split(' ')[0];
  var prtStr = '[' + chalk.gray(time) + '] ' +
               chalk[color](level.toUpperCase()) + ': ' +
               prefix + ': ' + str;
  console.log(prtStr);
}

function Logger(prefix) { this.prefix = path.basename(prefix); }

var levelToColor = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'white'
};

Object.keys(levelToColor).forEach(function (level) {
  Logger.prototype[level] = function (str) {
    colorPrt(level, this.prefix, str);
    if (level === 'error') {
      process.exit(1);
    }
  };
});

// extend fs

// same as 'mkdir -p dirname'
function makeDirs(dirname) {
  var dirnames = dirname.split(path.sep);
  var parentDir = '';
  dirnames.forEach(function (n) {
    parentDir += n + path.sep;
    try {
      fs.statSync(parentDir);
    } catch(e) {
      if (e.code === 'ENOENT') {
        fs.mkdirSync(parentDir);
      } else if (e.code === 'EEXIST') {
      } else {
        throw e;
      }
    }
  });
}


fs.safeSave = function (likeyExist, unlikeyExist, data) {
  var fullpath = path.join(likeyExist, unlikeyExist);
  var dirname = path.dirname(fullpath);
  try {
    fs.statSync(likeyExist);
  } catch (e) {
    makeDirs(likeyExist);
  }
  makeDirs(dirname);
  fs.writeFile(fullpath, data, 'utf-8', function (err) {
    if(err) throw err; 
  });
}

// path


module.exports.Logger = Logger;
module.exports.fs = fs;
