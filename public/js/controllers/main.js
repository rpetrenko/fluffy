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

        // CREATE  ============
        $scope.addCharacter = function(formData) {
            if (formData.name != undefined && formData.name != "") {
                console.log("Saving character: [" + formData.name + "] [" + formData.desc + "] [" + formData.picture + "]" );
                Characters.create(formData)
                    .success(function(data) {
                        $scope.characters = data;
                        formData.name = undefined;
                        formData.desc = undefined;
                        formData.picture = undefined;
                    });
            }
        };

        // UPDATE ===========
        $scope.uploadPictureUpdateCharacter = function($files, character) {
            var file1 = $files[0];
            $scope.upload = $upload.upload({
                url: 'upload/',
                // a file object (name, size, type, lastModifiedDate)
                file: file1
                // data
                // headers
                // method : "POST"
            }).success(function(data, status, headers, config) {
                console.log(config);
                character.picture = config.file.name;
                $scope.updateCharacter(character);
            });
        };

        $scope.updateCharacter = function(character) {
            Characters.update(character._id, character)
                .success(function(data) {
                    $scope.characters = data;
                });
        };

        //begin file upload
        $scope.onFileSelect = function($files, formData) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'upload/', //upload.php script, node.js route, or servlet url
                    //method: 'POST' or 'PUT',
                    //headers: {'header-key': 'header-value'},
                    //withCredentials: true,
//                    data: {myObj: $scope.formData.name},
                    file: file
                    // or list of files ($files) for html5 only
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                    // customize file formData name ('Content-Disposition'), server side file variable name.
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                    // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('percent: ' + $scope.progress);
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(config);
                    formData.picture = config.file.name;
//                    console.log(config.file.name);
                });
                //.error(...)
                //.then(success, error, progress);
                // access or attach event listeners to the underlying XMLHttpRequest.
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})
            }
        };
        //end file upload

        // modal for adding new character
        var myModal = $modal({scope: $scope, title: 'Adding new character', content: 'Please type the name', template: 'add-new.html', show: false});
        $scope.showModal = function() {
           myModal.$promise.then(myModal.show);
        };
        $scope.hideModal = function() {
           myModal.$promise.then(myModal.hide);
        };

    }]);