const chalk = require('chalk');

function colorPrt(level, prefix, str) {
  var color = levelToColor[level];
  var prtStr = '[' + (new Date()).toLocaleString() + '] ' +
               chalk[color](level.toUpperCase()) + ': ' +
               prefix + ': ' + str;
  console.log(prtStr);
}

function Logger(prefix) { this.prefix = prefix; }

var levelToColor = {
  critical: 'red',
  error: 'magenta',
  warn: 'yellow',
  info: 'green',
  debug: 'white'
};

Object.keys(levelToColor).forEach(function (level) {
  Logger.prototype[level] = function (str) {
    colorPrt(level, this.prefix, str);
  };
});


module.exports.Logger = Logger;
