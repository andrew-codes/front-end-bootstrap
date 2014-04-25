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
    var thirdPartyStyles = buildThirdPartyStyles(bowerFile.dependencies);
    var appStyles = buildStylusCss([paths.styles.input]);
    return es.merge(thirdPartyStyles, appStyles)
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

function buildThirdPartyStyles(bowerDependencies) {
    return gulp.src(getBowerDependencies(bowerDependencies, {css: true}))
        .pipe(concat('vendor.css'));
}

function buildThirdPartyScripts(bowerDependencies) {
    return gulp.src(getBowerDependencies(bowerDependencies, {scripts: true}))
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

function getBowerMain(dependencyName, main, options) {
    var filePaths = [];
    if (Object.prototype.toString.call(main) === '[object Array]') {
        main.forEach(function (filePath) {
            if (filePathIsAMatch(filePath, options)) {
                filePaths.push(adjustBowerScriptPath(dependencyName, filePath));
            }
        });
    }
    else if (filePathIsAMatch(main, options)) {
        filePaths.push(adjustBowerScriptPath(dependencyName, main));
    }
    return filePaths;
}

function filePathIsAMatch(filePath, options) {
    var suffix = '.js';
    if (options.css){
        suffix = '.css';
    }
    return filePath.indexOf(suffix, filePath.length - suffix.length) !== -1;
}

function getBowerDependencies(dependencies, options) {
    var filePaths = [];
    if (dependencies == null) {
        return filePaths;
    }
    Object.keys(dependencies).forEach(function (dependencyName) {
        var dependencyBowerFile = require(paths.bowerComponentsPath + '/' + dependencyName + '/bower.json');
        filePaths = filePaths.concat(getBowerDependencies(dependencyBowerFile.dependencies, options), getBowerMain(dependencyName, dependencyBowerFile.main, options));
    });
    return filePaths;
}