'use strict';

angular.module('postItApp')
  .directive('postWall', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the postWall directive');
      }
    };
  });
