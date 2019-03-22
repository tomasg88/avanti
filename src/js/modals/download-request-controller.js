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
                $scope.messageText = 'DOWNLOADS.FORM.VALIDATION_MSGS';
                return false;
            }

            if (!emailRegEx.test($scope.user.email.trim())) {
                $scope.hasMessage = true;
                $scope.messageText = 'DOWNLOADS.FORM.VALIDATION_MSGS';
                return false;
            }
            return true;
        }

        function doDownload() {
			// Trick to download images in Firefox
			HTMLElement.prototype.click = function() {
				var evt = this.ownerDocument.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				this.dispatchEvent(evt);
			};
			var anchor;
			var chrome   = navigator.userAgent.indexOf('Chrome') > -1;
			var explorer = navigator.userAgent.indexOf('MSIE') > -1;
			var safari   = navigator.userAgent.indexOf('Safari') > -1;
			var opera    = navigator.userAgent.toLowerCase().indexOf('op') > -1;
			if ((chrome) && (safari)) {safari = false;}
			if ((chrome) && (opera)) {chrome = false;}

			if (safari || explorer) {
				anchor = anchor || angular.element([
					'<a',
					' href="',
					$scope.content,
					'" target="_blank"></a>'
				].join(''))[0];
			} else {
				anchor = anchor || angular.element([
					'<a download="',
					getDownloadTitle(),
					'.',
					$scope.extension,
					'" href="',
					$scope.content,
					'" target="_blank"></a>'
				].join(''))[0];
			}

            $timeout(function() {
                anchor.click();
            }, 0);
		}

        function getDownloadTitle() {

        }

        $scope.ok = function() {
            if (validateForm()) {
                Email.sendEmail($scope.user).then(
                    function onSuccess(response) {
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
