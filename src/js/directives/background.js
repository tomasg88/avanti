/**
 * @ngdoc overview
 * @name Avanti.background
 * @description
 *
 * Pone background en las secciones
 */

'use strict';

angular.module('avanti').directive('background',
['$window', '$rootScope',
    function ($window, $rootScope) {
        return {
            restrict: 'EA',
            templateUrl: 'views/directives/background.html',
            replace: true,
            scope: {
            },
            link: function (scope, el, attr, ctrl) {

                console.log(angular.element(el.children()[0]));
                console.log(el);
                console.log(el.parent().css('height'));


                var parent = angular.element(el.children()[0]); /* Es el container. Siempre tiene la maxima altura */
                var izq = angular.element(el.children()[0]);
                var der = angular.element(el.children()[1]);

                var pages = {
                    home: {
                        half: false,
                        type: 'back-degrade-sup'
                    },
                    aboutUs: {
                        half: true,
                        type: {
                            izquierda: 'back-degrade-der',
                            derecha: 'back-solido-oscuro'
                        }
                    },
                    authors: {
                        half: false,
                        type: 'back-solido-oscuro'
                    },
                    authorsDetails: {
                        half: true,
                        type: {
                            izquierda: 'back-degrade-izq',
                            derecha: 'back-solido-oscuro'
                        }
                    },
                    illustrators: {
                        half: false,
                        type: 'back-degrade-sup'
                    },
                    illustratorsDetails: {
                        half: true,
                        type: {
                            izquierda: 'back-degrade-izq',
                            derecha: 'back-solido-oscuro'
                        }
                    },
                    illustrators: {
                        half: false,
                        type: 'back-degrade-sup'
                    },
                    books: {
                        half: false,
                        type: 'back-degrade-sup'
                    },
                    shops: {
                        half: false,
                        type: 'back-solido-oscuro'
                    }
                }

                izq.addClass('back-degrade-sup');
                izq.css({ width: '100%' });
                // el.css({ height: el.parent().css('height') });
                el.css({ width: '100%' });

                $rootScope.$on('$routeChangeSuccess', function() {
                    console.log('Fn: ', el.parent().css('height'));
                    izq.addClass('back-degrade-sup');
                    izq.css({ width: '100%' });
                });
                
                // angular.element($window).bind('resize', function() {
                //     console.log('Fn: ', el.parent().css('height'));
                //     izq.addClass('back-degrade-sup');
                //     izq.css({ width: '100%' });
                //     $scope.$digest();
                // });

                // 1. Hacer mapeo entre secciones y backgrounds.
                //
                // Props CSS que voy a necesitar sobre estos elementos
                // width: si le mando 100% hace pantalla completa
                //
                //
                //
                // left: calc(100% /2); -> si le pongo dividido 2 empezaria en la derecha
                //                      -> Si no lo pongo empieza en la izquierda
                // width: calc(100% / 2); -> Si pongo dividido 1 el background es completo
                //                        -> Si le pongo 2, ocupa media pantalla.

            }
        };
    }
]);
