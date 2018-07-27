/**
 * @ngdoc overview
 * @name avanti.gallery
 * @description
 *
 * description
 */

(function() {
    'use strict';

    angular
        .module('avanti')
        .directive('gallery', [gallery]);

    /* @ngInject */
    function gallery() {
        return {
            restrict: 'EA',
            templateUrl: 'views/directives/gallery.html',
            scope: {
                bookName: '='
            },
            link: function(scope, elem, attr, ctrl) {
                $.global = {};
                scope.openPresentation = function() {
                    $("#slide-window").fadeIn("slow");

                    var WindowWidth = $(window).width();
                    var SlideCount = $('#slides li').length;
                    var SlidesWidth = SlideCount * WindowWidth;

                    $.global.item = 0;
                    $.global.total = SlideCount;
                    $.global.open = true;

                    $('.slide').css('width', WindowWidth + 'px');
                    $('#slides').css('width', SlidesWidth + 'px');

                    $("#slides li:nth-child(1)").addClass('alive');

                }
                scope.Slide = function(direction) {
                    if (direction == 'back') {
                        var $target = $.global.item - 1;
                    }
                    if (direction == 'forward') {
                        var $target = $.global.item + 1;
                    }
                    if ($target == -1) {
                        scope.DoIt($.global.total - 1);
                    } else if ($target == $.global.total) {
                        scope.DoIt(0);
                    } else {
                        scope.DoIt($target);
                    }
                }
                scope.DoIt = function(target) {
                    var windowwidth = $(window).width();
                    var margin = windowwidth * target;
                    var actualtarget = target + 1;

                    $("#slides li:nth-child(" + actualtarget + ")").addClass('alive');
                    $('#slides').css('transform', 'translate3d(-' + margin + 'px,0px,0px)');
                    $.global.item = target;
                    $('#count').html($.global.item + 1);

                }
                scope.closePresentation = function() {
                    $("#slide-window").hide("medium");
                    $.global.item = 1;
                    $.global.open = false;
                }

                // Binding events
                $('#btnPresentation').bind('click', function() {
                    scope.openPresentation();
                });
                $('#btnPrevious').bind('click', function() {
                    scope.Slide('back');
                });
                $('#btnNext').bind('click', function() {
                    scope.Slide('forward');
                });
                $('#btnClose').bind('click', function() {
                    scope.closePresentation();
                });
                $(document).on("keydown", function(e) {
                    if ($.global.open) {
                        switch (e.keyCode) {
                            case 37:
                                scope.Slide("back");
                                break;
                            case 39:
                                scope.Slide("forward");
                                break;
                            case 27:
                                scope.closePresentation();
                                break;
                        }
                    }
                });
            }
        }
    }

})();
