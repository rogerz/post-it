'use strict';

describe('Directive: postWall', function () {

  // load the directive's module
  beforeEach(module('postItApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-wall></post-wall>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the postWall directive');
  }));
});
