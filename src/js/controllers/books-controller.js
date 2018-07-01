/**
 * @ngdoc overview
 * @name avanti.bookCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('bookCtlr',
['$scope',
  function($scope) {

    /* PRIVATE FUNCTIONS */
    function init() {
      // Namespace for holding variables and easier interpretation from the view
      $scope.vv = {};
    }

    /* PUBLIC FUNCTIONS */


    // Initialize
    init();
  }
]);
