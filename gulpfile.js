'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var es = require('event-stream');
var bowerFile = require('./bower.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var connect = require('connect');

var paths = {
    resources: './build',
    styles: {
        input: './src/styles/app.styl',
        output: './build/css'
    },
    scripts: {
        input: './src/app/**/*.js',
        output: './build/js'
    },
    bowerComponentsPath: './bower_components'
};

gulp.task('default', ['build'], function () {

});

gulp.task('start', ['build'], function () {
    connect()
        .use(connect.static(paths.resources))
        .listen(9999);
});

gulp.task('build', ['build.styles', 'build.scripts', 'build.resources'], function () {
    var injectables = gulp.src([
                paths.resources + '/js/*.js',
                paths.resources + '/css/*.css']
        , {read: false});
    return gulp.src('./src/index.html')
        .pipe(inject(injectables, {ignorePath: '/build',
            sort: function (a, b) {
                return a < b ? -1 : a == b ? 0 : 1;
            }}))
        .pipe(gulp.dest(paths.resources));
});

gulp.task('build.styles', [], function () {
    return buildStylusCss([paths.styles.input])
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.styles.output));
});

gulp.task('build.scripts', [], function () {
    var thirdPartyScripts = buildThirdPartyScripts(bowerFile.dependencies);
    var appScripts = buildAppScripts([paths.scripts.input]);
    return es.merge(thirdPartyScripts, appScripts)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('build.resources', [], function () {
    return gulp.src(['./src/**/*.*', '!./src/index.html', '!./src/app/**/*.js'])
        .pipe(gulp.dest(paths.resources));
});

function buildStylusCss(inputPaths) {
    return gulp.src(inputPaths)
        .pipe(stylus());
}

function buildThirdPartyScripts(bowerDependencies) {
    var scripts = [];
    Object.keys(bowerDependencies).forEach(function (key) {
        var dependencyBowerFile = require(paths.bowerComponentsPath + '/' + key + '/bower.json');
        var main = dependencyBowerFile.main;
        scripts = scripts.concat(getBowerMainJsFiles(key, main));
    });
    return gulp.src(scripts)
        .pipe(concat('vendor.js'));
}

function buildAppScripts(inputPaths) {
    return gulp.src(inputPaths)
        .pipe(concat('app.js'));
}

function adjustBowerScriptPath(dependencyName, scriptPath) {
    scriptPath = scriptPath.replace('./', '');
    return paths.bowerComponentsPath + '/' + dependencyName + '/' + scriptPath;
}

function getBowerMainJsFiles(dependencyName, main) {
    var scripts = [];
    if (typeof main === 'Array') {
        main.forEach(function (script) {
            if (isJsFile(script)) {
                scripts.push(adjustBowerScriptPath(dependencyName, script));
            }
        });
    }
    else if (isJsFile(main)) {
        scripts.push(adjustBowerScriptPath(dependencyName, main));
    }
    return scripts;
}

function isJsFile(filePath) {
    var suffix = '.js';
    return filePath.indexOf(suffix, filePath.length - suffix.length) !== -1;
}