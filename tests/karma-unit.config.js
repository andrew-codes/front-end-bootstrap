'use strict';

var sharedConfig = require('./karma-shared.config');

module.exports = function (config) {
    var conf = sharedConfig();

    var files = [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js'
        ];
    conf.files = files.concat(conf.files, [

        'bower_components/angular-mocks/angular-mocks.js',
        './test/mocha-config.js',
        './tests/unit/**/*.js'
    ]);
    return config.set(conf);
};