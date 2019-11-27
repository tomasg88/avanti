angular.module('avanti')
    .constant('BREAKPOINTS', {
    	isLarge: window.innerWidth > 1200,
    	isMedium: window.innerWidth > 992 && window.innerWidth <= 1200,
    	isSmall: window.innerWidth > 768 && window.innerWidth <= 992,
    	isExtraSmall: window.innerWidth <= 768
    })
    .constant('ANIMATIONS', {
        clickCounter: 4,
        mobileInterval: 14000,
        ttl: 4000
    })
    .constant('WELCOME_MODAL', true)
