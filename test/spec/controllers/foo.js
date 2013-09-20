'use strict';

describe('Controller: FooCtrl', function () {

  // load the controller's module
  beforeEach(module('postItApp'));

  var FooCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FooCtrl = $controller('FooCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
