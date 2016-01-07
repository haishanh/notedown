'use strict';

const fs = require('fs-extra'),
      path = require('path'),
      glob = require('glob'),
      helper = require('./helper'),
      log = new helper.Logger(__filename),
      Note = require('./note'),
      Theme = require('./theme'),
      Config = require('./config'),
      Context = require('./context'),
      Index = require('./index_page');


function build() {
  console.log('Building...');
  var config = (new Config()).load();
  var notes = [];
  var tags = {};
  var categories = {};
  var theme = new Theme(config);
  theme.init();
  var context = new Context().update(config, Theme);
  var files = glob.sync(config.source_dir + '/**/*.md', {
                ignore: config.source_dir + '/**/_*'
              });


  files.forEach(function (file) {
    var n = new Note(file, config, tags, categories);
    n.render(context.note);
    notes.push(n);
  });
  notes.forEach(function (note) {
    log.info(' * ' + note.title);
    log.info('    Category:' + note.category);
    log.info('    Tag:' + note.tags);
    log.info('    Link:' + note.link);
  });

  // individual note page
  // url route: /<root>/tags/<tagName>/index.html
  Object.keys(tags).forEach(function (tagName) {
    tags[tagName].render(context.tag);
  });

  // individul category page
  // url route: /<root>/categories/<cateName>/index.html
  Object.keys(categories).forEach(function (cateName) {
    categories[cateName].render(context.category);
  });

  // global index page
  var index = new Index(config);
  log.info('Rendering index page');
  index.render(context.index, notes, categories, tags);
}

function serve() {
  console.log('Serving...');
}


module.exports = {
  build,
  init,
  serve
};
