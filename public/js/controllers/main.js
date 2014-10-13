angular.module('mainModule', [
    'angularFileUpload',
    'ngAnimate',
    'mgcrea.ngStrap',
    'ngCookies',
    'ngTable',
    'ui.router',
    'youtube-embed'
])

    .config(function($modalProvider) {
        angular.extend($modalProvider.defaults, {
            html: true
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partial-about.html'
        })

        .state('videos', {
            url: '/videos',
            templateUrl: 'partial-videos.html'
        })

        .state('drawings', {
            url: '/drawings',
            templateUrl: 'partial-drawings.html'
        })

        .state('characters', {
            url: '/characters',
            views: {
                '': { templateUrl: 'characters.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: ''
                }
            }
        });

    })

    // inject characterService, videoService
    .controller('mainController', ['$scope', '$http', 'Characters', 'Videos', '$modal', '$upload', function($scope, $http, Characters, Videos, $modal, $upload) {

        $scope.addVideo = function(formData) {
            if (formData.code != undefined && formData.code != "") {
                console.log("Saving youtube url: [" + formData.code + "]");
                Videos.create(formData)
                    .success(function(data) {
                        $scope.videos = data;
                        formData.code = undefined;
                    });
            }
        };

        Videos.get()
            .success(function(data) {
                $scope.videos = data;
            });

        $scope.deleteVideo = function(id) {
            Videos.delete(id)
                .success(function(data) {
                    $scope.videos = data;
                })
        };


        // GET =====================================================================
        Characters.get()
            .success(function(data) {
                $scope.characters = data;
            });

        // DELETE  ==================================================================
        $scope.deleteCharacter = function(id) {
            Characters.delete(id)
                .success(function(data) {
                    $scope.characters = data;
                })
        };

        $scope.addCharacter = function(formData) {
            if (formData.name != undefined && formData.name != "") {
                console.log("Saving character: [" + formData.name + "] [" + formData.desc + "]");
                Characters.create(formData)
                    .success(function(data) {
                        $scope.characters = data;
                        formData.name = undefined;
                        formData.desc = undefined;
                    });
            }
        };

        // modal for adding new character
        var myModal = $modal({scope: $scope, title: 'Adding new character', content: 'Please type the name', template: 'add-new.html', show: false});
        $scope.showModal = function() {
           myModal.$promise.then(myModal.show);
        };
        $scope.hideModal = function() {
           myModal.$promise.then(myModal.hide);
        };

    }]);