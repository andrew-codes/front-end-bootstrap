(function (angular) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'utilities']);
    app.config(['$routeProvider', 'routeService', configureRoutes]);
    app.run(['$rootScope', run]);

    var routes = [
        {
            path: '/home',
            isDefault: true,
            module: 'main'
        }
    ];

    function configureRoutes($routeProvider, routeService) {
        routes.forEach(function (route) {
            $routeProvider.when(route.path, routeService.getRoute(route));
            if (route.isDefault) {
                $routeProvider.otherwise({redirectTo: route.path});
            }
        });
    }

    function run($rootScope) {

    }
}(angular));