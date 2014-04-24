/*global define, describe, beforeEach, afterEach, it*/
'use strict';

describe('ExampleService', function () {
    beforeEach(angular.mock.module('utilities'));

    it('it should contain a RouteService', inject(['ExampleService', function (sut) {
        sut.should.not.be.null;
    }]));

    describe('when testing the example', function () {
        it('it return hello world text', inject(['ExampleService', function (sut) {
            var actual = sut.example();
            actual.should.equal('Hello World');
        }]));
    });
});