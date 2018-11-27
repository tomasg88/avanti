
'use strict';

angular.module('avanti').directive('onResize',
['$rootScope', '$window', 'BREAKPOINTS',
	function ($rootScope, $window, BREAKPOINTS) {
		return {
			restrict: 'A',
			link: function (scope, el, attr, ctrl) {
				// Breakpoint values match values defined in Bootstrap
				var breakpoints = {
					xs: 480,
					sm: 768,
					md: 992,
					lg: 1200
				}

				angular.element($window).bind('resize', function(){

					// Reset breakpoint flags
					BREAKPOINTS.isExtraSmall = BREAKPOINTS.isSmall = BREAKPOINTS.isMedium = BREAKPOINTS.isLarge = false;

					// Get window width
					scope.width = $window.innerWidth;

					// Evaluate size and set proper flag
					if (scope.width <= breakpoints.sm) {
						BREAKPOINTS.isExtraSmall = true;
					} else if (scope.width > breakpoints.sm && scope.width <= breakpoints.md) {
						BREAKPOINTS.isSmall = true;
					} else if (scope.width > breakpoints.md && scope.width <= breakpoints.lg) {
						BREAKPOINTS.isMedium = true;
					} else if (scope.width > breakpoints.md) {
						BREAKPOINTS.isLarge = true;
					}

					$rootScope.breakpoints = BREAKPOINTS;

					// Trigger digest cycle as 'resize' event is not an Angular event.
					scope.$digest();
				});

			}
		};
	}
]);
