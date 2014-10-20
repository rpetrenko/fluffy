'use strict';

//angular.module('sessionService', [])
//    .factory('Session', ['$http', function ($http) {
//        return {
//            save: function(data) {
//                return $http.post('/auth/session/', data);
//            }
//
//        }
//    }]);

angular.module('sessionService', [])
    .factory('Session', function ($resource) {
        return $resource('/auth/session/');
    });