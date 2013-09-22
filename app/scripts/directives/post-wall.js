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
        var gridPos = (function (rows, cols) {
          var slots = [],
              i, j;
          for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
              slots.push({
                top: i / rows * 100 + '%',
                left: j / cols * 100 + '%',
                width: 1 / rows * 100 + '%'
              });
            }
          }
          return function (index) {
            return slots[index % (rows * cols)];
          };
        })(attrs.rows, attrs.cols);
        scope.postItPos = function (index) {
          return gridPos(index);
        };
      }
    };
  })
  .animation('.post-it-item', function () {
    return {
      enter: function (element, done) {
        var styles = JSON.parse(jQuery(element).attr('post-it-pos'));
        jQuery(element).css({
          opacity: 0,
          left: 0,
          top: 0,
          width: '100%'
        });
        jQuery(element).animate({
          opacity: 1,
          top: styles.top,
          left: styles.left,
          width: styles.width
        }, done);
        return function (cancelled) {
          if (cancelled) {
            jQuery(element).stop();
          }
        };
      },
      leave: function (element, done) {
        jQuery(element).animate({
          opacity: 0
        }, done);
      }
    };
  });
