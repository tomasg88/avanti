/*
 * Handles download requests
 */

'use strict';

angular.module('avanti').controller('DownloadRequestModalController',
['$uibModalInstance', '$scope', '$timeout', '$filter', 'Email', 'resourceId',
    function ($uibModalInstance, $scope, $timeout, $filter, Email, resourceId) {

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

            $scope.user = {
                name: '',
                surname: '',
                email: '',
                country: '',
                city: '',
                resource: $scope.downloadObject.name,
                subject: 'download'
            }

            $scope.errors = {
                name: false,
                surname: false,
                email: false,
                country: false,
                city: false
            }
            $scope.emailError = "";

        }

        function resetErrors() {
            $scope.errors.name = $scope.errors.surname = $scope.errors.country = $scope.errors.email = $scope.errors.city = false;
            $scope.emailError = "";
        }

        function validateForm() {
            var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var result = true;

            resetErrors()

            // Name
            if ($scope.user.name.trim() === "") {
                $scope.errors.name = true;
                result = false;
            }

            // Surname
            if ($scope.user.surname.trim() === "") {
                $scope.errors.surname = true;
                result = false;
            }

            // Email
            console.log($scope.user.email);
            if ($scope.user.email.trim() === "") {
                $scope.errors.email = true;
                $scope.emailError = $filter('translate')('DOWNLOADS.FORM.VALIDATION_MSGS.REQUIRED_FIELD');
                result = false;
            } else if (!emailRegEx.test($scope.user.email.trim())) {
                $scope.errors.email = true;
                $scope.emailError = $filter('translate')('DOWNLOADS.FORM.VALIDATION_MSGS.EMAIL_FORMAT');
                result = false;
            }

            // Country
            if ($scope.user.country.trim() === "") {
                $scope.errors.country = true;
                result = false;
            }

            // City
            if ($scope.user.city.trim() === "") {
                $scope.errors.city = true;
                result = false;
            }

            return result;
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
