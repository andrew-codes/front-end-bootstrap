/*global define, describe, beforeEach, afterEach, it*/
'use strict';

describe('RouteService', function () {
    beforeEach(angular.mock.module('utilities'));

    it('it should contain a RouteService', inject(['RouteService', function (sut) {
        sut.should.not.be.null;
    }]));

    describe('given route data without a view', function () {
        var routeData,
            expected;
        beforeEach(function () {
            routeData = {
                path: '/home',
                module: 'main'
            };
            expected = {
                templateUrl: 'app/main/views/home.html'
            };
        });
        describe('when getting the route from the route data', function () {
            it('it should return an angular route with an inferred templateUrl', inject(['RouteService', function (sut) {
                var actual = sut.getRoute(routeData);
                actual.should.deep.equal(expected);
            }]));
        });
    });

    describe('given route data with a specified view', function () {
        var routeData,
            expected;
        beforeEach(function () {
            routeData = {
                path: '/home',
                module: 'main',
                view: 'myHome'
            };
            expected = {
                templateUrl: 'app/main/views/myHome.html'
            };
        });
        it('it should return an angular route with the specified view for the templateUrl', inject(['RouteService', function (sut) {
            var actual = sut.getRoute(routeData);
            actual.should.deep.equal(expected);
        }]));
    });
});