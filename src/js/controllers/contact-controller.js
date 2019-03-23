/**
 * @ngdoc overview
 * @name avanti.contactCtlr
 * @description description
 *
 */

'use strict';

angular.module('avanti').controller('contactCtlr', ['$scope', 'Email',
    function($scope, Email) {

        /* PRIVATE FUNCTIONS */
        function init() {
            $scope.messageText = '';
            $scope.hasMessage = false;
            $scope.form = {}
            $scope.form.name = '';
            $scope.form.email = '';
            $scope.form.msg = '';
            $scope.form.subject = 'contact';
        }

        function validateForm() {
            var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ($scope.form.name.trim() === "" || $scope.form.email.trim() === "" || $scope.form.msg.trim() === "") {
                $scope.hasMessage = true;
                $scope.messageText = 'CONTACT.MESSAGES.MANDATORY_FIELD';
                return false;
            }

            if (!emailRegEx.test($scope.form.email.trim())) {
                $scope.hasMessage = true;
                $scope.messageText = 'CONTACT.MESSAGES.EMAIL_FORMAT';
                return false;
            }
            return true;
        }

        $scope.sendEmail = function() {
            if (validateForm()) {
                Email.sendEmail($scope.form).then(
                    function onSuccess(response) {
                        $scope.hasMessage = true;
                        $scope.messageText = 'CONTACT.MESSAGES.SUCCESS';
                    },
                    function onError(response) {
                        console.log('Error al ');
                        $scope.hasMessage = true;
                        $scope.messageText = 'CONTACT.MESSAGES.SEND_ERROR';
                    }
                );
            }
        }


        // Initialize
        init();
    }
]);
