'use strict';

angular.module('avanti').factory('DB',
['$http',
    function($http) {
        function get(language) {
            if (!OBJECT.data) {
                $http.get('resources/base-es.json').then(
                    function onSuccess(response) {
                        OBJECT.data = response.data;
                        return response.data;
                    },
                    function onError(error) {
                        console.log('ERROR EN SVC');
                        console.log(error);
                    }
                );
            } else {
                return OBJECT.data;
            }
        }

        var OBJECT = {
            data: {},
            get: get
        }

        return OBJECT;

    }
]);
