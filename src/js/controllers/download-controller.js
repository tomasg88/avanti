/*
 * Controller to handle download requests
 */

'use strict';

angular.module('avanti').controller('downloadCtlr',
['$scope', '$rootScope', '$uibModal',
    function($scope, $rootScope, $uibModal) {

        var WALLPAPERS_PREFIX = "wallpaper-";
        var WALLPAPERS_PATH = "img/wallpapers/";
        var WALLPAPERS_EXTENSION = ".jpg";

        function init() {
            $scope.wpPrefix = WALLPAPERS_PATH + WALLPAPERS_PREFIX;
            $scope.extension = WALLPAPERS_EXTENSION;
        }

        $scope.openDownloadRequest = function(resource) {
            console.log(resource);
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/download-request.html',
                controller: 'DownloadRequestModalController',
                size: 'lg',
                resolve: {
                    resourceId: resource
                }
            })
        }

        init();

    }
]);
