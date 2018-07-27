'use strict';

angular.module('avanti').controller('ModalController',
['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {

        $scope.close = function() {
            $uibModalInstance.close();
        }

    }
]);
