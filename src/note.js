'use strict';

const path = require('path'),
      swig = require('swig'),
      yaml = require('js-yaml'),
      markdown = require('marked'),
      Tag = require('./tag'),
      helper = require('./helper'),
      fs = helper.fs,
      log = new helper.Logger(path.basename(__filename));


var reFrontMatter = /^(-{3,5}\s*?\n|\s*)(\S[\s\S]*?\n)(-{3,5})([\s\S]*$)/;

function splitFM(file) {
  var fileContent = fs.readFileSync(file, 'utf-8');
  var frontMatter = '';
  var mdContent = '';
  if (reFrontMatter.test(fileContent)) {
    var match = fileContent.match(reFrontMatter);
    frontMatter = match[2];
    mdContent = match[4];
  } else {
    mdConent = fileContent;
  }
  return {
    fm: frontMatter,
    md: mdContent
  }
}

function convertMD(str) {
  markdown.setOptions({
    renderer: new markdown.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  }); 
  return markdown(str);
}

function setNoteProperties() {
  /* set category
   * if mdfile is <source_dir>/linux/bash/bash-shell.md
   *    then category is 'linux'
   * if markdown file is <source_dir>/bash-shell.md
   *    then category is 'uncategorized'
   */
   var filePath = this.path.slice(this._config.source_dir.length + 1);
   var tokens = filePath.split(path.sep);
   if (tokens.length > 1) {
    this.category = tokens[0];
   } else {
    this.category = 'uncategorized';
   }
  /* set link
   * 
   */
   if (this.category === 'uncategorized') {
     this.link = this._config.root + this.name + '/'; 
   } else {
     this.link = this._config.root + this.category + '/' + this.name + '/'; 
   }
}


function Note(file, config, globalTags) {
  this.path = file;
  this.filename = path.basename(file); 
  this.name = path.basename(file, path.extname(file));
  this.tags = [];
  this._config = config;
  this._globalTags = globalTags;
}

Note.prototype.render = function () {
  log.info(`Rendering ${this.path}`);
  var content = splitFM(this.path);
  var fm = yaml.safeLoad(content.fm);
  var context = {};
  // roughly extend
  var self = this;
  for (var key in fm) {
    if (key.toLowerCase() === 'tags') {
      fm[key].forEach(function (tag) {
        var theTag;
        if (tag in self._globalTags) {
          theTag = self._globalTags[tag];
        } else {
          theTag = new Tag(tag, self._config);
          self._globalTags[tag] = theTag;
        }
        theTag.count++;
        theTag.notes.push(self);
        self.tags.push(theTag);
      });
    }
    self[key.toLowerCase()] = fm[key];
  }
  //
  setNoteProperties.call(this);
  // convert
  this.article = convertMD(content.md);
  context.title = "This is a test";
  context.note = this;
  var result = swig.renderFile(path.join(this._config.theme_dir,
                                         'templates',
                                         'note.html'),
                               context);
  var sub = this.category === 'uncategorized' ? '' : this.category;
  fs.safeSave(path.join(this._config.output_dir,
                        sub),
              path.join(this.name,
                        'index.html'),
              result);
};

module.exports = Note;
