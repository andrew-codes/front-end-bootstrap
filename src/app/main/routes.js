(function () {
    'use strict';

    angular.module('main.routes', ['ngRoute'])
        .config(['$routeProvider', configureRoutes]);

    var routes = [
        {
            name: 'home',
            path: '/home',
            isDefault: true
        }
    ];

    function configureRoutes($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/main/views/home.html'
        });
        routes.forEach(function (route) {
            if (route.isDefault) {
                $routeProvider.otherwise({redirectTo: route.path});
            }
            var routeView = route.view;
            if (routeView == null) {
                routeView = route.path.substring(1);
            }
            $routeProvider.when(route.name, route.path, {
                templateUrl: 'app/main/views/' + routeView + '.html'
            })
        });
    }
}());