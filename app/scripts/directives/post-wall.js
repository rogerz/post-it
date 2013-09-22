'use strict';

angular.module('postItApp')
  /*
    A config panel to manage the post-it list. Add/remove post-it manually.
   */
  .directive('postItPanel', function () {
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
                width: 1 / cols * 100 + '%',
                height: 1 / rows * 100 + '%'
              });
            }
          }
          //+ Jonas Raoni Soares Silva
          //@ http://jsfromhell.com/array/shuffle [v1.0]
          function shuffle(o) { //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
          }

          slots = shuffle(slots);

          return function (index) {
            return slots[index % (rows * cols)];
          };
        })(attrs.rows, attrs.cols);
        scope.postItPos = function (index, slot) {
          return gridPos(index, slot);
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
          width: '100%',
          height: '100%'
        });
        jQuery(element).animate({
          opacity: 1,
          top: styles.top,
          left: styles.left,
          width: styles.width,
          height: styles.height
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
