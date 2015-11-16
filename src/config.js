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

function Config() {}

Config.prototype.load = function () {
  log.info('Loading Configurations...');
  try {
    var cfg = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'));
  } catch (e) {
    log.warn(`Configuration file ${configFile} not found.
default configuration will be used`);
    return defaultConfig;
  }
  for (var key in cfg) {
    if (key in defaultConfig) {
      defaultConfig[key] = cfg[key];
    } else {
      log.warn('Drop unsupported config \'%s\'');
    }
  }
  return defaultConfig;
}

module.exports = Config;
