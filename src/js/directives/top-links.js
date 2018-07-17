'use strict;'

angular.module('avanti').directive('topLinks', ['$location', '$rootScope',
    function($location, $rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/directives/top-links.html',
            scope: {},
            link: function(scope, elem, attrs, ctrl) {

                scope.home = function() {
                    $location.path('/home');
                }

                scope.$watch(function() {
                    return $location.path();
                }, function() {
                    if ($location.path() !== '/home') {
                        // TODO agregar o esconder via clase CSS
                        $(".top-links").transition({
                            y: '90px'
                        });
                    } else {
                        $(".top-links").transition({
                            y: '-90px'
                        });
                    }
                });

            }
        }
    }
]);