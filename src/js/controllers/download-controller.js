/*
 * Controller to handle download requests
 */

'use strict';

angular.module('avanti').controller('downloadCtlr',
['$scope', '$rootScope', '$uibModal',
    function($scope, $rootScope, $uibModal) {

        function init() {

        }

        $scope.openDownloadRequest = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/download-request.html',
                controller: 'DownloadRequestModalController',
                size: 'lg'
            })
        }

        init();

    }
]);
