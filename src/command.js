'use strict';

const glob = require('glob'),
      helper = require('./helper'),
      log = new helper.Logger(__filename),
      Note = require('./note'),
      Config = require('./config');

function build() {
  console.log('Building...');
  var config = (new Config()).load();
  var notes = [];
  var tags = {}
  glob(config.source_dir + '/**/*.md', function (err, files) {
    if (err) {
      log.error(err.name + err.message);  
    }
    files.forEach(function (file) {
      var n = new Note(file, config, tags);
      n.render();
      notes.push(n);
    });
    notes.forEach(function (note) {
      log.info(' * ' + note.title);
      log.info('    Category:' + note.category);
      log.info('    Tag:' + note.tags);
      log.info('    Link:' + note.link);
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
