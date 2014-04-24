(function () {
    'use strict';

    var app = angular.module('main', ['main.routes']);
    app.run(['$rootScope', run]);

    function run($rootScope) {
        console.log('hello');
    }
}());