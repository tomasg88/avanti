'use strict';

angular.module('avanti').directive('auxMenu',
['$rootScope', '$location', '$timeout',
  function($rootScope, $location, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'views/directives/aux-menu.html',
      replace: true,
      scope: {},
      link: function(scope, elem, attr) {

        var timeoutFn = null;

        scope.$watch(function() {
          return $location.path();
        }, function() {
          if ($location.path() !== '/home') {
            $(".lengueta").transition({ y: '-40px' });
          } else {
            $(".lengueta").transition({ y: '40px' });
          }
        });

        // TODO REFACTORIZAR PARA ESCONDER O MOSTRAR CON FUNCIONES
        //
        $(".lengueta").hover(
    			function(event) {
    				$(".lengueta").transition({ opacity: 1 });
    			}, function (event) {
    				$(".lengueta").transition({ opacity: 0.6 });
    			}
    		);

        $(".lengueta").click(function(event){
    			$(".menu-mobile").transition({ y: "-40px" });
    		});

        $("div.menu-mobile span").hover(function(event) {
    			event.preventDefault();
    			$(event.currentTarget.children[0]).removeClass('ocultar');
          if (timeoutFn) {
            $timeout.cancel(timeoutFn);
          }
    		}, function(event) {
    			event.preventDefault();
    			$(event.currentTarget.children[0]).addClass('ocultar');
    			timeoutFn = $timeout(function (event) {
  					$(".menu-mobile").transition({ y: "0px" });
    			}, (1500));
    		});

        scope.linkTo = function(target) {
          $(".menu-mobile").transition({ y: "0px" });
          $location.path(target)
        }

      }
    }
  }
]);
