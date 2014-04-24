'use strict';

module.exports = function () {
    return {
        basePath: '../',
        frameworks: ['mocha'],
        reporters: ['progress'],
        browsers: [
            'PhantomJS',
            'Chrome'
        ],
        autoWatch: true,
        singleRun: false,
        colors: true,
        files: [
            // 3rd party

            // App specific code
            'src/app/**/*.js',

            // Test specific code
            'node_modules/chai/chai.js',
            'tests/lib/chai-should.js'
        ]
    }
};