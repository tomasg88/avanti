/**
 * @ngdoc overview
 * @name avanti
 * @description
 *
 * description
 */

angular.getLanguage = function(separator) {

    if (!separator) separator = '_';
    var params = window.location.hash.split('lang=');
    var pathLang = (params.length === 2) ? params[1] : null;

    var language = pathLang || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage,
        availableLanguages = ['en-GB', 'es-ES'],
        languageRE = new RegExp('^' + language.split('-')[0], 'i'),
        useLanguage = availableLanguages.reduce(function(n, i) {
            return n || (i.match(languageRE) ? i.replace('-', separator) : false);
        }, false);
    //	}
    if (!useLanguage) {
        useLanguage = availableLanguages[0].replace('-', separator);
    }

    return useLanguage;
};

(function() {
    'use strict';

    angular
        .module('avanti', [
            'ngAnimate',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'pascalprecht.translate',
            'ui.bootstrap'
        ])
        .config(['$routeProvider', '$translateProvider',
            function($routeProvider, $translateProvider) {
                $routeProvider
                    .when('/', {
                        redirectTo: '/home'
                    })
                    .when('/home', {
                        templateUrl: 'views/home.html',
                        controller: 'homeCtlr'
                    })
                    .when('/about-us', {
                        templateUrl: 'views/about-us.html'
                    })
                    .when('/authors', {
                        templateUrl: 'views/authors.html'
                    })
                    .when('/authors/:id', {
                        templateUrl: 'views/details/author-details.html'
                    })
                    .when('/illustrators', {
                        templateUrl: 'views/illustrators.html'
                    })
                    .when('/illustrators/:id', {
                        templateUrl: 'views/details/illustrator-details.html'
                    })
                    .when('/books', {
                        templateUrl: 'views/books.html',
                        controller: 'bookCtlr'
                    })
                    .when('/books/:bookId', {
                        templateUrl: 'views/details/book-details.html',
                        controller: 'bookDetailsCtlr'
                    })
                    .when('/shops', {
                        templateUrl: 'views/shops.html',
                        controller: 'shopsCtlr'
                    })
                    .when('/contact', {
                        templateUrl: 'views/contact.html',
                        controller: 'contactCtlr'
                    })
                    .when('/download', {
                        templateUrl: 'views/download.html',
                        controller: 'downloadCtlr'
                    });

                $translateProvider
                    .useStaticFilesLoader({
                        prefix: './languages/',
                        suffix: '.json'
                    })
                    .preferredLanguage(angular.getLanguage('_'))
                    .useSanitizeValueStrategy('escape');
            }
        ])
        .run(['$rootScope', '$location', '$window', '$timeout', '$uibModal', '$document',
            function($rootScope, $location, $window, $timeout, $uibModal, $document) {

                $rootScope.showLoader = true;
                $rootScope.windowHeight = '';
                $rootScope.home = true;
                $rootScope.main = {};
                $rootScope.main.sections = {
                    home: 'HOME',
                    aboutUs: 'ABOUT_US',
                    authors: 'AUTHORS',
                    illustrators: 'ILLUSTRATORS',
                    books: 'BOOKS',
                    shops: 'SHOPS',
                    contact: 'CONTACT',
                    downloads: 'DOWNLOADS'
                }

                $rootScope.redirectTo = function(target) {
                    if (target) {
                        $location.path(target);
                    }
                }
                $rootScope.openLink = function(target) {
                    if (target) {
                        window.open(target, "_blank");
                    }
                }

                $timeout(function() {
                    $rootScope.showLoader = false;
                }, 3000);

                // $timeout(function() {
                //     var parentSelector, size;
                //     var parentElem = angular.element($document[0].querySelector('.modal-demo'));
                //     $uibModal.open({
                //         animation: true,
                //         templateUrl: 'myModalContent.html',
                //         controller: 'ModalController',
                //         size: 'lg'
                //     });
                // }, 6000);

            }
        ]);
})();
