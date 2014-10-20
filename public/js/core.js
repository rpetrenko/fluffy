angular.module('myApp', [
    'mainModule',
    'characterService',
    'videoService',
    'authService',
    'sessionService',
    'userService',
    //     for authentication
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'http-auth-interceptor'
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
                templateUrl: 'partials/characters.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'partials/signup.html'
            })
            .state('logout', {
                url: '/home',
                controller: function($scope) {
                    $scope.logout();
                }
            })
            .state('login', {
                url: '/login',
                controller: function($scope){
                    $scope.showLogin();
                }
            });
    })

    // for authentication
    .run(function ($rootScope, $location, Auth) {
        //watching the value of the currentUser variable.
        $rootScope.$watch('currentUser', function(currentUser) {
            // if no currentUser and on a page that requires authorization then try to update it
            // will trigger 401s if user does not have a valid session
            if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
                Auth.currentUser();
            }
        });
        // On catching 401 errors, redirect to the login page.
        $rootScope.$on('event:auth-loginRequired', function() {
            $location.path('/login');
            return false;
        });
    });


