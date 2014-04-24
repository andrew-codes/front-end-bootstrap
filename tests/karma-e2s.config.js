'use strict';

var sharedConfig = require('./karma-shared.config');

module.exports = function (config) {
    var conf = sharedConfig();
    conf.files = conf.files.concat([
        './tests/e2e/**/*.js'
    ]);
    conf.proxies = {
        '/': 'http://localhost:9999/src'
    };
    conf.browsers = ['Chrome'];
    conf.urlRoot = '/_karma_/';
    conf.frameworks = ['ng-scenario'];
    config.set(conf);
};