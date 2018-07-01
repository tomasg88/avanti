/**
 * @ngdoc overview
 * @name avanti.myResize
 * @description
 *
 * Ajusta la pantalla si el usuario resizea la pantalla
 */

'use strict';

angular.module('avanti').directive('myResize',
['$window',
  function ($window) {
    return {
      link: function (scope, el, attr, ctrl) {
        var w = angular.element($window);

        scope.getWindowDimensions = function () {
          return { 'h': w.height(), 'w': w.width() };
        };

        scope.$watch(scope.getWindowDimensions,
          function (newValue, oldValue) {
      			scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            scope.style = function () {
    		      return {
                'height': (newValue.h - 100) + 'px',
                'width': (newValue.w - 100) + 'px'
              };
      			};
      		},
          true
        );

        w.bind('resize', function(event) {
          scope.$apply();
        });
      }
    };
  }
]);
