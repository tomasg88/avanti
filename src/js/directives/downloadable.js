/** 
 * 
 */

'use strict'

angular.module('avanti').directive('downloadable', 
[ '$timeout', 
    function($timeout) {
        return {
            restrict: 'A',
            scope: {
                downloadablePath: '@',
                downloadableName: '@'
            },
            link: function(scope, el, attr, ctrl) {

                el.on('click', function() {
                    var downloadObject = {
                        path: scope.downloadablePath,
                        name: scope.downloadableName
                    }
                    // Trick to download images in Firefox
                    HTMLElement.prototype.click = function () {
                        var evt = this.ownerDocument.createEvent('MouseEvents');
                        evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        this.dispatchEvent(evt);
                    };
                    var anchor;
                    var chrome = navigator.userAgent.indexOf('Chrome') > -1;
                    var explorer = navigator.userAgent.indexOf('MSIE') > -1;
                    var safari = navigator.userAgent.indexOf('Safari') > -1;
                    var opera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
                    if ((chrome) && (safari)) { safari = false; }
                    if ((chrome) && (opera)) { chrome = false; }

                    if (safari || explorer) {
                        anchor = anchor || angular.element([
                            '<a',
                            ' href="',
                            downloadObject.path + downloadObject.name,
                            '" target="_blank"></a>'
                        ].join(''))[0];
                    } else {
                        anchor = anchor || angular.element([
                            '<a download="',
                            downloadObject.name,
                            '" href="',
                            downloadObject.path + downloadObject.name,
                            '" target="_blank"></a>'
                        ].join(''))[0];
                    }

                    $timeout(function () {
                        anchor.click();
                    }, 1000);
                    
                });
            }
        }
    }
])