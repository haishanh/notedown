'use strict';

function Context() {
  this.common = {};
  this.index = {};
  this.note = {};
  this.tag = {};
  this.category = {};
}


function merge(obj) {
  let i,
      prop,
      other;

  for (i = 1; i < arguments.length; i++) {
    other = arguments[i];
    for (prop in other) {
      if (Object.prototype.hasOwnProperty.call(other, prop)) {
        obj[prop] = other[prop];
      }
    }
  }

  return obj;
}

/*
 * @param {object} theme must have been loaded
 */
Context.prototype.update = function (config, Theme) {
  this.common['url_for'] = Theme.url_for;
  this.common['author'] = config.author;
  this.common['title'] = config.title;
  this.common.menu = merge({}, config.menu);
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
