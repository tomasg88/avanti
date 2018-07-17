/**
 * @ngdoc overview
 * @name avanti.shopsCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('shopsCtlr', ['$scope',
    function($scope) {

        /* PRIVATE FUNCTIONS */
        function init() {
            // Namespace for holding variables and easier interpretation from the view
            $scope.shopsList = [{
                    name: 'Borges 1975',
                    address: 'J. L. Borges 1975',
                    city: 'C.A.B.A',
                    phone: '4775-1056'
                },
                {
                    name: 'Melmoth Libros',
                    address: 'Florida 520, 5° piso, ofic. 507',
                    city: 'C.A.B.A',
                    phone: '6766-4664'
                },
                {
                    name: 'Gambito de Alfil',
                    address: 'Puan 511',
                    city: 'C.A.B.A',
                    phone: '4432-1304'
                },
                {
                    name: 'Librería Caligari',
                    address: 'Bogotá 101',
                    city: 'C.A.B.A',
                    phone: '4981-6953'
                },
                {
                    name: 'Caburé Libros',
                    address: 'México 620',
                    city: 'C.A.B.A',
                    phone: '4300-1183'
                },
                {
                    name: 'Santiago Arcos Editor',
                    address: 'Puan 481',
                    city: 'C.A.B.A',
                    phone: '4432-3107'
                },
                {
                    name: 'Libros del Pasaje',
                    address: 'Thames 1762',
                    city: 'C.A.B.A',
                    phone: '4833-6637'
                },
                {
                    name: 'Entelequia',
                    address: 'Uruguay 341',
                    city: 'C.A.B.A',
                    phone: '4372-7282'
                }
            ];
        }

        /* PUBLIC FUNCTIONS */


        // Initialize
        init();
    }
]);