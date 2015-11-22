'use strict';

const pathFn = require('path'),
  swig = require('swig'),
  helper = require('./helper'),
  fs = helper.fs;

// watch out
// this file contains code for rendering the website level index.html
// not 'nodejs package' like index.js


function Index(config) {
  this._config = config;
}

Index.prototype.render = function (notes, categories, tags) {
  var per_page = this._config.per_page,
      page_total = (notes.length + per_page - 1) / per_page;
  // TODO url_for
  var context = {};
  context.categories = categories;
  context.tags = tags;
  var page_dir = 'page';
  var prev_text = '&laquo; Older';
  var next_text = 'Newer &raquo;';
  for (var page_id = 0; page_id < page_total; page_id++) {
    let start = page_id * per_page;
    let target_path = '';
    context.notes = notes.slice(start, start+per_page);
    context.pagination = paginate(page_id+1, page_total, this._config.root,
        page_dir, prev_text, next_text);
    let result = swig.renderFile(pathFn.join(this._config.theme_dir,
                                           'templates',
                                           'index.html'),
                                 context);
    if (page_id == 0) {
      target_path = pathFn.join(this._config.output_dir,
                                this._config.root,
                                'index.html');
    } else {
      target_path = pathFn.join(this._config.output_dir,
                                this._config.root,
                                page_dir,
                                '' + page_id,
                                'index.html');
    }
    fs.safeSave(target_path, result);
  }
}


function paginate(current, total, root, page, prev_text, next_text) {
  let start, end;
  if (total <=1 ) {
    return '';
  }
  html = '';
  function href(id) {
    if (id === 1) {
      return root;
    } else {
      return root + page + '/' + id + '/';
    }
  }
  if (current > 1) {
    html += '<a href="' + href(current-1) + '" ' + 'class="prev">' +
            prev_text + '</a>\n'
  }
  start = Math.max(current-2, 1);
  end = Math.min(start+4, total);
  while (start <= end) {
    if (start === current) {
      html += '<span class="page-num current">' + current + '</span>\n'
    } else {
      html += '<a href="' + href(start) + '" class="page-num">' +
              start + '</a>\n'
    }
    start++;
  }
  if (current < total) {
    html += '<a href="' + href(current+1) + '" ' + 'class="next">' +
            next_text + '</a>\n'
  }
  return html;
}


module.exports = Index;
