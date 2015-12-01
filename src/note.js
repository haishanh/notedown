'use strict';

const path = require('path'),
      swig = require('swig'),
      yaml = require('js-yaml'),
      _ = require('lodash'),
      markdown = require('hs-marked-extra'),
      Tag = require('./tag'),
      Category = require('./category'),
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
    sanitize: false,
    smartLists: true,
    smartypants: false,
    admonition: true
  });
  return markdown(str);
}

/**
 * Retrive TOC from html
 * @function
 * @param {string} x - html string
 * @param {number} n - number of levels of headings want to keep
 *
 * for example n = 3,
 *   if there are [h1 h3 h4 h5] in x, all [h1 h3 h4] will be kept
 *   if there are [h3 h4] in x, all [h3 h4] will be kept
 */
function getToc(x, n) {
  var reHeading = /<h([1-6])\s+[^\n]*?id="([^\n]+?)"(?:\s+[^\n]*?)?>([^\n]+?)<\/h[1-6]>/,
      headings = [],
      i,
      cap,
      hl, // lodash wrappered headings
      keep,
      out = '<div class="toc">',
      pre = 0,
      closeTags = ['</div>'],
      tmp;

  // parse text
  while (cap = reHeading.exec(x)) {
    x = x.substring(cap.index + cap[0].length);
    headings.push({
      level: cap[1] - 0,
      id: cap[2],
      title: cap[3]
    });
  }

  hl = _(headings);
  tmp = hl
    .sortBy('level')
    .pluck('level')
    .uniq()
    .take(n)
    .reverse()
    .value()

  keep = tmp[0] || n;
  pre = tmp[tmp.length -1] - 1;

  hl
    .filter(function (h) {
      return h.level <= keep;
    })
    .forEach(function (h) {
      var dif = h.level - pre;
      pre = h.level;
      if (dif > 0) {
        for (i = 0; i < dif; i++) {
          out += '<ul><li>';
          closeTags.push('</li></ul>');
        }
      } else if (dif < 0) {
        dif = -dif;
        for (i = 0; i < dif; i++) {
          out += closeTags.pop();
        }
        out += '</li><li>';
      } else {
        out += '</li><li>';
      }
      out += '<a href="#' +
             h.id +
             '">' +
             h.title +
             '</a>';
    })
    .value();

  closeTags.forEach(function (tag) {
    out += tag;
  });

  return out;
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
  var theCate;
  var theCateName;
  if (tokens.length > 1) {
   theCateName = tokens[0];
  } else {
   theCateName = 'uncategorized';
  }

  if (theCateName in this._globalCategories) {
    theCate = this._globalCategories[theCateName];
  } else {
    theCate = new Category(theCateName, this._config);
    this._globalCategories[theCateName] = theCate;
  }

  theCate.notes.push(this);
  theCate.count += 1;
  this.category = theCate;

  log.debug('== category name ==');
  log.debug(this.category.name);
  /* set link
   * uncategorized notes stay in root
   */
  if (theCateName === 'uncategorized') {
    this.link = this._config.root + this.name + '/';
  } else {
    this.link = this._config.root + theCateName + '/' + this.name + '/';
  }
}


function Note(file, config, globalTags, globalCategories) {
  log.debug('note init...');
  this.path = file;
  this.filename = path.basename(file);
  this.name = path.basename(file, path.extname(file));
  this.tags = [];
  this.category = null;
  this._config = config;
  this._globalTags = globalTags;
  this._globalCategories = globalCategories;
}

Note.prototype.render = function (note_context) {
  log.info(`Rendering ${this.path}`);
  var content = splitFM(this.path);
  var fm = yaml.safeLoad(content.fm);
  var context = note_context || {};
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
    } else {
      self[key.toLowerCase()] = fm[key];
    }
  }
  //
  setNoteProperties.call(this);
  // convert
  this.article = convertMD(content.md);
  // TOC
  this.toc = getToc(this.article, 3);
  context.title = this.title;
  context.note = this;
  swig.setDefaults({ autoescape: false });
  var result = swig.renderFile(path.join(this._config.theme_dir,
                                         'templates',
                                         'note.html'),
                               context);
  var sub = this.category.name === 'uncategorized' ? '' : this.category.name;
  fs.safeSave(path.join(this._config.output_dir,
                        sub),
              path.join(this.name,
                        'index.html'),
              result);
};

module.exports = Note;
