/*
    Controls random appearing of Illustrations in the users's window
*/

angular.module('avanti').directive('animations',
['$document', '$timeout', '$uibModal', 'BREAKPOINTS', 'ANIMATION_CLICK_COUNTER',
    function ($document, $timeout, $uibModal, BREAKPOINTS, ANIMATION_CLICK_COUNTER) {
        return {
            restrict: 'EA',
            link: function(scope, elem, attr, ctrl) {

                var clickCounter = 0, triggered = 0;
                var imagesPath = [
                    'img/illustrations/1.png',
                    'img/illustrations/2.png'
                ]
                scope.illustration = '';

                $document.on('click', function() {
                    clickCounter++;
                    if (clickCounter >= ANIMATION_CLICK_COUNTER) {
                        triggerModal(imagesPath[1]);
                        clickCounter = 0;
                    }
                });

                function getImages() {

                }

                function triggerModal(img) {
                    $uibModal.open({
                        animation: true,
                        template: '<img class="slide" style="width:100%" src="' + img + '" />',
                        controller: 'ModalController',
                        size: 'md'
                    });
                }

            }
        }
    }
]);
