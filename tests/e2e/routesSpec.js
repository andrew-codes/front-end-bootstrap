/*global define, describe, beforeEach, afterEach, it, angular*/
'use strict';

describe('routes', function () {
    beforeEach(function () {
        browser().navigateTo('/');
    });

    describe('when navigating to an unknown route', function () {
        it('it should jump to the /home path', function () {
           browser().location().hash().name.should.equal('/home');
        });
    });
});