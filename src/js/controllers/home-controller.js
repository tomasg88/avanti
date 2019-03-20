/**
 * @ngdoc overview
 * @name avanti.homeCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('homeCtlr',
['$scope', '$rootScope', '$filter', '$sanitize',
    function($scope, $rootScope, $filter, $sanitize) {

        /* PRIVATE FUNCTIONS */
        function init() {
            $scope.selectedOption = '';
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
