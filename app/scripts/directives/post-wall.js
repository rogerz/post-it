'use strict';

angular.module('postItApp')
  .directive('postItForm', function () {
    function controller($scope) {
      $scope.newPostIt = {};
      $scope.postItList = [
        {src: 'http://china.nba.com/media/teamLogos/medium/ATL.png'},
        {src: 'http://china.nba.com/media/teamLogos/medium/BKN.png'}
      ];
      $scope.addPostIt = function () {
        var newPostIt = {
          src: $scope.newPostIt.src.trim()
        };
        if (!newPostIt.src.length) {
          return;
        }
        $scope.postItList.push(newPostIt);
        $scope.newPostIt = {};
      };
      $scope.removePostIt = function (index) {
        $scope.postItList.splice(index, 1);
      };
    }
    return {
      templateUrl: 'views/post-it-form-tpl.html',
      restrict: 'E',
      controller: ['$scope', controller],
      link: function postLink(scope, elemen, attrs) {
      }
    }
  })
  .directive('postItWall', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the postWall directive');
      }
    };
  });
