'use strict';

angular.module('avanti').directive('auxMenu', ['$rootScope', '$location', '$timeout',
    function($rootScope, $location, $timeout) {
        return {
            restrict: 'EA',
            templateUrl: 'views/directives/aux-menu.html',
            replace: true,
            scope: {},
            link: function(scope, elem, attr) {

                var timeoutFn = null,
                    HIDE_MENU_TIME = 0;

                if ($rootScope.breakpoints.isExtraSmall) {
                    HIDE_MENU_TIME = 3000;
                    $("div.menu-mobile span p").removeClass("ocultar");
                } else {
                    HIDE_MENU_TIME = 1500;
                }

                scope.$watch(function() {
                    return $location.path();
                }, function() {
                    if ($location.path() !== '/home') {
                        $(".lengueta").transition({
                            y: '-40px'
                        });
                    } else {
                        $(".lengueta").transition({
                            y: '40px'
                        });
                    }
                });

                // TODO REFACTORIZAR PARA ESCONDER O MOSTRAR CON FUNCIONES
                //
                $(".lengueta").hover(
                    function(event) {
                        $(".lengueta").transition({
                            opacity: 1
                        });
                    },
                    function(event) {
                        $(".lengueta").transition({
                            opacity: 0.6
                        });
                    }
                );

                $(".lengueta").click(function(event) {
                    showMenu()
                });

                $("div.menu-mobile span").hover(function(event) {
                    event.preventDefault();
                    if (!$rootScope.breakpoints.isExtraSmall) {
                        $(event.currentTarget.children[0]).removeClass('ocultar');
                    }
                    if (timeoutFn) {
                        $timeout.cancel(timeoutFn);
                    }
                }, function(event) {
                    event.preventDefault();
                    if (!$rootScope.breakpoints.isExtraSmall) {
                        $(event.currentTarget.children[0]).addClass('ocultar');
                    }
                    timeoutFn = $timeout(function() {
                        console.log('Timeout esconde menu');
                        hideMenu()
                    }, (3000));
                });

                scope.linkTo = function(target) {
                    hideMenu();
                    $location.path(target)
                }

                function showMenu() {
                    if ($rootScope.breakpoints.isExtraSmall) {
                        $(".menu-mobile").transition({
                            x: "100vw"
                        });
                    } else {
                        $(".menu-mobile").transition({
                            y: "-40px"
                        });
                    }
                }

                function hideMenu() {
                    if ($rootScope.breakpoints.isExtraSmall) {
                        $(".menu-mobile").transition({
                            x: "0px"
                        });
                    } else {
                        $(".menu-mobile").transition({
                            y: "0px"
                        });
                    }
                }

            }
        }
    }
]);
