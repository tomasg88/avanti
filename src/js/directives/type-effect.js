/**
 * @ngdoc overview
 * @name avanti.typeEffect
 * @description
 *
 * description
 */

(function() {
    'use strict';

    angular
        .module('avanti')
        .directive('typeEffect', typeEffect);

    typeEffect.$inject = ['$filter'];

    function typeEffect($filter) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                var words = [
                    $filter('translate')('TYPE_EFFECT.FIRST'),
                    $filter('translate')('TYPE_EFFECT.SECOND'),
                    $filter('translate')('TYPE_EFFECT.THIRD'),
                    $filter('translate')('TYPE_EFFECT.FOURTH')
                ]
                $(element).typed({
                    strings: words,
                    typeSpeed: 170,
                    backDelay: 1500,
                    loop: true,
                    loopCount: false,
                });

            }
        };

    }

})();