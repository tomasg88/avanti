angular.module('avanti')
    .constant('BROWSER', {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    })
    .constant('BREAKPOINTS', {
    	isLarge: window.innerWidth > 1200,
    	isMedium: window.innerWidth > 992 && window.innerWidth <= 1200,
    	isSmall: window.innerWidth > 768 && window.innerWidth <= 992,
    	isExtraSmall: window.innerWidth <= 768
    })
