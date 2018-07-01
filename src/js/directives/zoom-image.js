angular.module('avanti').directive('zoomImage',
[
  function() {
    return {
      restrict: 'EA',
      template: '<img src="{{file}}" />',
      replace: true,
      scope: {
        file: '@'
      },
      link: function(scope, elem, attr) {
    		$(elem).hover(function() {
    			$(this).transition({ scale: 1.6 });
    		}, function () {
    			$(this).transition({ scale: 1 });
    		});
      }
    }
  }
]);
