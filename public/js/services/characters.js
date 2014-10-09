angular.module('characterService', [])

    // super simple service
    // each function returns a promise object
    .factory('Characters', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/api/characters');
            },
            create : function(characterData) {
                return $http.post('/api/characters', characterData);
            },
            delete : function(id) {
                return $http.delete('/api/characters/' + id);
            }
        }
    }]);