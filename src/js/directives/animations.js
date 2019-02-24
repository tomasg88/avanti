/*
    Controls random appearing of Illustrations in the users's window
*/

angular.module('avanti').directive('animations',
['$document', '$timeout', '$interval', 'BREAKPOINTS', 'ANIMATIONS',
    function ($document, $timeout, $interval, BREAKPOINTS, ANIMATIONS) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/directives/animations.html',
            link: function(scope, elem, attr, ctrl) {

                var clickCounter = 0,
                    HTMLElement = '<img class="illustration" src="_IMG_" />',
                    path = 'img/illustrations/', ext = '.jpg',
                    totalImages = 6, lastImage;

                scope.showImg = false;

                // For mobile, animation is triggered automatically
                // For web, triggers after 4 user clicks
                if (BREAKPOINTS.isExtraSmall) {
                    path = path + 'portrait/'
                    $interval(function() {
                        show(nextImage());
                    }, ANIMATIONS.mobileInterval);
                } else {
                    path = path + 'landscape/'
                    $document.on('click', function() {
                        clickCounter++;
                        if (clickCounter >= ANIMATIONS.clickCounter) {
                            show(nextImage());
                            clickCounter = 0;
                        }
                    });
                }

                function nextImage() {
                    var newImage = Math.floor(Math.random() * 6) + 1,
                        result;
                    if (newImage === lastImage) {
                        return nextImage();
                    } else {
                        lastImage = newImage;
                        return path + newImage + ext;
                    }
                }

                // Add HTML element
                function show(img) {
                    // Concatenate image path
                    var element = HTMLElement.replace('_IMG_', img);

                    // Show container with transition effect
                    scope.showImg = true;
                    elem.append(element);
                    if (!BREAKPOINTS.isExtraSmall) {
                        scope.$digest();
                    }

                    // Trigger close
                    $timeout(close, ANIMATIONS.ttl);
                }

                // Delete HTML element
                function close() {
                    scope.showImg = false;
                    elem.empty();
                    if (!BREAKPOINTS.isExtraSmall) {
                        scope.$digest();
                    }
                }

            }
        }
    }
]);
