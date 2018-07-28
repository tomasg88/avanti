'use strict';

angular.module('avanti').controller('ModalController',
['$timeout', '$uibModalInstance', '$scope',
    function($timeout, $uibModalInstance, $scope) {

        $timeout(function() {
            $uibModalInstance.close();
        }, 3000);

    }
]);
