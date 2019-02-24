/*
 * Handles download requests
 */

'use strict';

angular.module('avanti').controller('DownloadRequestModalController',
['$uibModalInstance', '$scope', 'Email',
    function ($uibModalInstance, $scope, Email) {

        function init() {
            $scope.user = {
                name: '',
                surname: '',
                email: '',
                country: '',
                city: ''
            }
        }

        function validateForm() {
            var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ($scope.user.name.trim() === "" || $scope.user.email.trim() === "") {
                $scope.hasMessage = true;
                $scope.messageText = 'CONTACT.MESSAGES.MANDATORY_FIELD';
                return false;
            }

            if (!emailRegEx.test($scope.user.email.trim())) {
                $scope.hasMessage = true;
                $scope.messageText = 'CONTACT.MESSAGES.EMAIL_FORMAT';
                return false;
            }
            return true;
        }

        $scope.ok = function() {
            if (validateForm()) {
                Email.sendEmail($scope.user).then(
                    function onSuccess(response) {
                        $scope.hasMessage = true;
                        $scope.messageText = 'DOWNLOADS.MESSAGES.EMAIL_SENT';
                        doDownload();
                        $scope.close();
                    },
                    function onError(response) {
                        console.log('Error al ');
                        $scope.hasMessage = true;
                        $scope.messageText = 'CONTACT.MESSAGES.SEND_ERROR';
                    }
                );
            }
        }

        $scope.close = function() {
            $uibModalInstance.close()
        }

        init();
    }
]);
