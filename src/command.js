'use strict';

const glob = require('glob'),
      helper = require('./helper'),
      log = new helper.Logger(__filename),
      Note = require('./note'),
      Config = require('./config');

function build() {
  console.log('Building...');
  var config = (new Config()).load();
  glob(config.source_dir + '/**/*.md', function (err, files) {
    if (err) {
      log.error(err.name + err.message);  
    }
    files.forEach(function (file) {
      var n = new Note(file);
      n.render();
    });
  });
}

function serve() {
  console.log('Serving...');
}


module.exports = { 
  build: build,
  serve: serve
};
