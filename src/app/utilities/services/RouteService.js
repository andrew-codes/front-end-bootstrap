(function (angular) {
    'use strict';

    Route.$inject = [];
    function Route() {
        var service = {
            getRoute: getRouteFrom
        };

        var basePath = 'app';

        function getRouteFrom(route) {
            var view = route.view;
            if (view == null) {
                view = route.path.substring(1);
            }
            return {
                templateUrl: basePath + '/' + route.module + '/views/' + view + '.html'
            }
        }

        return service;
    }

    angular.module('utilities', []).factory('RouteService', Route);
}
(angular)
    )
;