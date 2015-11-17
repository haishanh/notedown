'use strict';

// watch out
// this file contains code for rendering the website level index.html
// not 'nodejs package' like index.js


function Index(config) {
  this._config = config;
}

Index.prototype.render = function (context, notes, categories, tags) {
  var per_page = this._config.per_page,
      page_total = (notes.length + per_page - 1) / per_page;
  // TODO url_for
  context.categories = categories;
  context.tags = tags;
  var page_dir = 'page';
  for (var page_id = 0; page_id < page_total; page_id++) {
    let start = page_id * per_page;
    context.notes = notes.slice(start, start+per_page);
    // TODO pagination
    let result = swig.renderFile(path.join(this._config.theme_dir,
                                           'templates',
                                           'index.html'),
                                 context);
    if (page_id == 0) {
      target_path = os.path
    } else {
    }
  
  }

}


module.exports = Index;
