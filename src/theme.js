const pathFn = require('path'),
      fs = require('fs-extra');

function Theme(config) {
  var fmap = {};
  fmap[config.theme_dir + '/resources/css/main.css'] = 
    pathFn.join(config.output_dir, config.root, 'css', 'main.css');
  fmap[config.theme_dir + '/resources/js/jquery-1.11.3.min.js'] = 
    pathFn.join(config.output_dir, config.root, 'js', 'jquery-1.11.3.min.js');
  fmap[config.theme_dir + '/resources/js/mdnotes.js'] =
    pathFn.join(config.output_dir, config.root, 'js', 'mdnotes.js');
  this.fmap = fmap;
  this._config = config;
  this._lookup = {};
}

Theme.prototype.load = function () {
  // move
  fs.ensureDirSync(pathFn.join(this._config.output_dir, this._config.root, 'css'));
  fs.ensureDirSync(pathFn.join(this._config.output_dir, this._config.root, 'js'));
  for (var f in this.fmap) {
    let name = pathFn.basename(f);
    fs.copySync(f, this.fmap[f], { clobber: true });
    this._lookup[name] = //TODO this._config.root + '/<ext>/name'
  }
}

Theme.prototype.url_for = function () {
  //TODO
}


module.exports = Theme;
