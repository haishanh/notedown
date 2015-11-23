'use strict';

const glob = require('glob'),
      helper = require('./helper'),
      log = new helper.Logger(__filename),
      Note = require('./note'),
      Config = require('./config'),
      Index = require('./index_page');

function build() {
  console.log('Building...');
  var config = (new Config()).load();
  var notes = [];
  var tags = {};
  var categories = {};
  var files = glob.sync(config.source_dir + '/**/*.md');

  
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
  var index = new Index(config);
  log.info('==================');
  log.info('Rendering index page');
  index.render(notes, categories, tags);
}

function serve() {
  console.log('Serving...');
}


module.exports = { 
  build: build,
  serve: serve
};
