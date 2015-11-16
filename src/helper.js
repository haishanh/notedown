'use strict';

const chalk = require('chalk');

// Logger
function colorPrt(level, prefix, str) {
  var color = levelToColor[level];
  var prtStr = '[' + (new Date()).toLocaleString() + '] ' +
               chalk[color](level.toUpperCase()) + ': ' +
               prefix + ': ' + str;
  console.log(prtStr);
}

function Logger(prefix) { this.prefix = prefix; }

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


module.exports.Logger = Logger;
