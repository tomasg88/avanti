/**
 * @ngdoc overview
 * @name avanti.homeCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('homeCtlr',
['$scope', '$rootScope', '$filter', '$sanitize', 'BROWSER',
    function($scope, $rootScope, $filter, $sanitize, BROWSER) {

        /* PRIVATE FUNCTIONS */
        function init() {
            $scope.selectedOption = '';
            $scope.isMobile = BROWSER.isMobile;
        }

        /* PUBLIC FUNCTIONS */
        $scope.getTranslated = function(key) {
            if (key != '') {
                return $filter('translate')(key + '.TITLE');
            } else {
                return '&nbsp;';
            }
        }

        $scope.getInitial = function(value) {
            return value[0];
        }

        $scope.selectThis = function(key) {
            $scope.selectedOption = key;
        }

        // Initialize
        init();
    }
]);
