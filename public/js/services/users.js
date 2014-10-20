'use strict';

angular.module('userService', [])
    .factory('User', function ($resource) {
        return $resource('/auth/users/:id/', {},
            {
                'update': {
                    method:'PUT'
                }
            });
    });