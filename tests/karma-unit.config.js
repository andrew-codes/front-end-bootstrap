'use strict';

var sharedConfig = require('./karma-shared.config');

module.exports = function (config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        'bower_components/angular-mocks/angular-mocks.js',
        './test/mocha-config.js',
        './tests/unit/**/*.js'
    ]);
    return config.set(conf);
};