'use strict';

const fs = require('fs'),
      path = require('path'),
      yaml = require('js-yaml'),
      helper = require('./helper'),
      log = new helper.Logger(path.basename(__filename));

var configFile = './config.yml';

var defaultConfig = {
  title: 'John Doe\'s Blog',
  author: 'John Doe',
  menu: {
    'Home': '/'
  },
  source_dir: 'notes',
  output_dir: 'output',
  theme_dir: 'themes/default',
  root: '/',
  per_page: 13
}


function exitIfNotExists(p) {
  fs.stat(p, function (err, stats) {
    if (err) {
      log.error(p + 'seems not exist');
      throw err;
    }
  });
}


function normalizeAndCheck(cfg) {

  // remove trailing slash, if exits
  cfg.source_dir.replace(/\/$/, '');
  cfg.output_dir.replace(/\/$/, '');
  cfg.theme_dir.replace(/\/$/, '');

  // for root, a trailing slash is needed
  cfg.root.replace(/(\/)?$/, '/');

  // check
  if (!/^\//.test(cfg.root)) {
    log.error('config.yml: root should start with a "/"');
    process.exit(1);
  }

  exitIfNotExists(cfg.source_dir);
  exitIfNotExists(cfg.theme_dir);
}

function Config() {}

Config.prototype.load = function () {
  log.info('Loading Configurations...');
  try {
    var cfg = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'));
  } catch (e) {
    log.error(`Configuration file ${configFile} not found.`);
  }
  for (var key in cfg) {
    if (key in defaultConfig) {
      defaultConfig[key] = cfg[key];
    } else {
      log.warn('Drop unsupported config \'%s\'');
    }
  }
  normalizeAndCheck(defaultConfig);
  return defaultConfig;
}

module.exports = Config;
