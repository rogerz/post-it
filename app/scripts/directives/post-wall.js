'use strict';

angular.module('postItApp')
  /*
    A config panel to manage the post-it list. Add/remove post-it manually.
   */
  .directive('postItPanel', function () {
    // generate an auto-incremental ID starting from 0
    var generateId = (function () {
      var id = 0;
      return function () {
        var newId = id;
        id = id + 1;
        return newId;
      };
    })();
    function controller($scope, $timeout) {
      $scope.newPostIt = {};
      $scope.postItList = [];

      $scope.submitPostIt = function () {
        var newPostIt = {
          src: $scope.newPostIt.src.trim()
        };
        if (newPostIt.src.length) {
          $scope.addPostIt(newPostIt);
        }
      };
      $scope.addPostIt = function (postIt) {
        postIt.id = generateId();
        postIt.style = $scope.config.postItStyles(postIt.id);
        if ($scope.postItList.length >= $scope.config.postItMax) {
          $timeout(function () {
            $scope.postItList.shift();
          }, 1000);
        }
        $scope.postItList.push(postIt);
      };

      $scope.removePostIt = function (index) {
        $scope.postItList.splice(index, 1);
      };

      var demo = [
        'http://china.nba.com/media/teamLogos/medium/ATL.png',
        'http://china.nba.com/media/teamLogos/medium/BKN.png'
      ];

      for (var i = 0; i < demo.length; i++) {
        $scope.addPostIt({
          src: demo[i]
        });
      }
    }
    return {
      templateUrl: 'views/post-it-form-tpl.html',
      restrict: 'E',
      controller: ['$scope', '$timeout', controller],
      link: function postLink(scope, elemen, attrs, ctrls) {
      }
    }
  })
  .directive('postItWall', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs, ctrls) {
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

        // calculate maximum post-it allowed
        var capacity = attrs.capacity || 1.0;
        if (capacity[capacity.length - 1] === '%') {
          capacity = capacity.substr(0, capacity.length - 1) / 100;
        }
        scope.config.postItMax = attrs.rows * attrs.cols * capacity;
        scope.config.postItStyles = function (id) {
          return gridPos(id);
        };
      }
    };
  })
  .animation('.post-it-item', function () {
    return {
      enter: function (element, done) {
        var scope = angular.element(element).scope();
        var styles = scope.config.postItStyles(jQuery(element).attr('post-it-id'));
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
