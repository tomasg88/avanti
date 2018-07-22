/**
 * @ngdoc overview
 * @name avanti.bookCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('bookDetailsCtlr',
['$scope', '$routeParams',
    function($scope, $routeParams) {

        /* PRIVATE FUNCTIONS */
        function init() {
            $scope.bookName = $routeParams.bookId.toUpperCase();
        }
        
        // Initialize
        init();
    }
]);
