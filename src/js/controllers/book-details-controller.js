/**
 * @ngdoc overview
 * @name avanti.bookCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('bookDetailsCtlr',
['$scope',
  function($scope) {

    /* PRIVATE FUNCTIONS */
    function init() {
      // Namespace for holding variables and easier interpretation from the view
      $scope.specialStyles = {
        contenido: {
          lineHeight: 1.4,
          color: "#B2B2B2",
          marginTop: 0,
          marginBottom: 0
        },
        tituloItem: {
          lineHeight: 1.4,
          color: "#B2B2B2",
          marginTop: 0,
          marginBottom: 0,
          paddingTop: '5%'
        },
        propiedadesLibro: {
          color: "#B2B2B2"
        }
      };
    }
    /* PUBLIC FUNCTIONS */


    // Initialize
    init();
  }
]);
