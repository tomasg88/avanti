'use strict';

angular.module('avanti').controller('ModalController',
['$timeout', '$uibModalInstance',
    function($timeout, $uibModalInstance) {

        $timeout(function() {
            $uibModalInstance.close();
        }, 3000);

    }
]);
