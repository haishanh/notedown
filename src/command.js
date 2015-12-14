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

let cfgStr = `title: John Doe's Notes
author: John Doe

menu:
  Home: /
  About: /about/

source_dir: notes
output_dir: output
theme_dir: themes/default

# site

# if you are using a sub domain for example, http://example.com/notes
# then root should be set to '/notes/' instead of '/'
root: /
per_page: 20
`;


let noteStr = `---
title: Hello There
published_on: 2015-12-14
updated_on: 2015-12-14
---
## This is a test note
`;


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


function init(args) {
  let theDir = args[0];
  let subDir = path.join(theDir, 'notes', 'hello');
  if (!theDir) log.error('You must supply a parameter as dir name');

  try {
    fs.ensureDirSync(theDir);
  } catch(err) {
    log.warn('Can not create dir ' + theDir);
    throw err;
  }
    
  fs.writeFile(path.join(theDir, 'config.yml'), cfgStr);

  fs.ensureDir(subDir, function (err) {
    if (err) {
      log.warn('Can not create dir ' + subDir);
      throw err;
    }
    fs.writeFile(path.join(subDir, 'hello.md'), noteStr);
  });

  console.log('Now Try run:');
  console.log('cd ' + theDir + ' && note build');
}

function serve() {
  console.log('Serving...');
}


module.exports = {
  build,
  init,
  serve
};
