angular.module('avanti')
.constant('BROWSER', {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isFirefox: /firefox/i.test(navigator.userAgent)
});
