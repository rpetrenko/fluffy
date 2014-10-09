angular.module('mainModule', ['angularFileUpload', 'ngAnimate', 'mgcrea.ngStrap', 'ngCookies', 'ngTable', 'ui.router'])

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


    // inject characterService
    .controller('mainController', ['$scope', '$http', 'Characters' ,'$modal', '$upload', function($scope, $http, Characters, $modal, $upload) {

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

//        $scope.modal = {
//            "title": "Title",
//            "content": "Hello Modal<br />This is a multiline message!"
//        };

    }]);