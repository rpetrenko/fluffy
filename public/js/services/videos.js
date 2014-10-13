angular.module('videoService', [])
    .factory('Videos', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/api/videos');
            },
            create : function(videoData) {
                return $http.post('/api/videos', videoData);
            },
            delete : function(id) {
                return $http.delete('/api/videos/' + id);
            }
        }
    }]);