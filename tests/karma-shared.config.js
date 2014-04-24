'use strict';

module.exports = function () {
    return {
        basePath: '../',
        frameworks: ['mocha'],
        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],
        reporters: ['progress'],
        browsers: [
            'PhantomJS',
            'Chrome'
        ],
        autoWatch: true,
        singleRun: true,
        colors: true,
        files: [
            // 3rd party
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',

            // App specific code
            'src/app/**/*.js',

            // Test specific code
            'node_modules/chai/chai.js',
            'tests/lib/chai-should.js'
        ]
    }
};