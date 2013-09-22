'use strict';

angular.module('postItApp')
  /*
    A form to manage the post-it list. Add/remove post-it manually.
   */
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
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var gridStyles = [];

        function createStyle(prop, value) {
          return prop + ':' + value;
        }

        for (var i = 0; i < attrs.rows; i++) {
          for (var j = 0; j < attrs.cols; j++) {
            gridStyles.push([
              createStyle('position', 'absolute'),
              createStyle('top', i / attrs.rows * 100 + '%'),
              createStyle('left', j / attrs.cols * 100 + '%')
            ].join(';'));
          }
        }
        scope.wallStyles = gridStyles;
      }
    };
  });
