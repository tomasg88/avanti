/*
 * Handles download requests
 */

'use strict';

angular.module('avanti').controller('DownloadRequestModalController',
['$uibModalInstance', '$scope', '$timeout', 'Email', 'resourceId',
    function ($uibModalInstance, $scope, $timeout, Email, resourceId) {

        var WALLPAPERS_PREFIX = "Avanti-WP-",
            WALLPAPERS_PATH = "assets/wp/",
            WALLPAPERS_EXTENSION = ".png";
        var TALE_PREFIX = "CIUDAD-SIN-NOMBRE",
            TALE_PATH = "assets/tales/",
            TALE_EXTENSION = ".pdf";

        function init() {

            if (typeof resourceId === "number") {
                $scope.downloadObject = {
                    path: WALLPAPERS_PATH,
                    name: WALLPAPERS_PREFIX + resourceId + WALLPAPERS_EXTENSION
                }
            } else  {
                $scope.downloadObject = {
                    path: TALE_PATH,
                    name: TALE_PREFIX + TALE_EXTENSION
                }
            }

            console.log('A descargar: ', $scope.downloadObject);

            $scope.user = {
                name: '',
                surname: '',
                email: '',
                country: '',
                city: '',
                resource: $scope.downloadObject.name
            }

        }

        function validateForm() {
            var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var result = false;
            if ($scope.user.name.trim() === "" || $scope.user.email.trim() === "") {
                $scope.hasMessage = true;
                $scope.messageText = 'DOWNLOADS.FORM.VALIDATION_MSGS';
                result = false;
            }

            if (!emailRegEx.test($scope.user.email.trim())) {
                $scope.hasMessage = true;
                $scope.messageText = 'DOWNLOADS.FORM.VALIDATION_MSGS';
                result = false;
            }
            return true;
        }

        function doDownload() {
            console.log('Path descarga comienzo: ', $scope.downloadObject);
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
					$scope.downloadObject.path + $scope.downloadObject.name,
					'" target="_blank"></a>'
				].join(''))[0];
			} else {
				anchor = anchor || angular.element([
					'<a download="',
					$scope.downloadObject.name,
					'" href="',
					$scope.downloadObject.path + $scope.downloadObject.name,
					'" target="_blank"></a>'
				].join(''))[0];
			}

            $timeout(function() {
                anchor.click();
            }, 1000);
		}

        $scope.ok = function() {
            if (validateForm()) {
                Email.sendEmail($scope.user).then(
                    function onSuccess(response) {
                        doDownload();
                        $scope.close();
                    },
                    function onError(response) {
                        $scope.hasMessage = true;
                        $scope.messageText = 'CONTACT.MESSAGES.SEND_ERROR';
                        doDownload();
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
