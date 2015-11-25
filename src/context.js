'use strict';

function Context() {
  this.common = {};
  this.index = {};
  this.note = {};
  this.tag = {};
  this.category = {};
}

/*
 * @param {object} theme must have been loaded
 */
Context.prototype.update = function (config, Theme) {
  this.common['url_for'] = Theme.url_for;
  this.common['author'] = config.author;
  this.common['title'] = config.title;
  this.common['menu'] = config.memu;
  this.common['header_title'] = config.title;
  for (var key in this.common) {
    this.index[key] = this.common[key];
    this.note[key] = this.common[key];
    this.tag[key] = this.common[key];
    this.category[key] = this.common[key];
  }
  return this;
}

module.exports = Context;
