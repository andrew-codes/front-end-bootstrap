(function () {
    'use strict';

    exampleService.$inject = [];
    function exampleService() {
        var service = {
            example: runExample
        };

        function runExample() {
            return 'Hello World';
        }

        return service;
    }

    angular.module('utilities').factory('ExampleService', exampleService);
}());