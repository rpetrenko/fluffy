//angular.module('authService', [])
//    .factory('Auth', ['$http', function($http) {
//        return {
//            login : function(data) {
//                return $http.post('/login', data);
//            },
//            logout : function(data) {
//                return $http.post('/logout', data);
//            }
//        }
//    }]);

'use strict';

angular.module('authService', [])
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {
        $rootScope.currentUser = $cookieStore.get('user') || null;
        console.log($rootScope.currentUser);
        $cookieStore.remove('user');

        return {

            login: function(provider, user, callback) {
                console.log("provider:" + provider);
                console.log("user:" + user.email);
                var cb = callback || angular.noop;
                Session.save({
                    provider: provider,
                    email: user.email,
                    password: user.password,
                    rememberMe: user.rememberMe
                }, function(user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            createUser: function(userinfo, callback) {
                var cb = callback || angular.noop;
                User.save(userinfo,
                    function(user) {
                        $rootScope.currentUser = user;
                        return cb();
                    },
                    function(err) {
                        return cb(err.data);
                    });
            },

            logout: function(callback) {
                console.log("auth service: logout");
                var cb = callback || angular.noop;
                Session.delete(function(res) {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function(err) {
                        return cb(err.data);
                    });
            },

            currentUser: function() {
                Session.get(function(user) {
                    $rootScope.currentUser = user;
                });
            },

            changePassword: function(email, oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;
                User.update({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function(user) {
                    console.log('password changed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            removeUser: function(email, password, callback) {
                var cb = callback || angular.noop;
                User.delete({
                    email: email,
                    password: password
                }, function(user) {
                    console.log(user + 'removed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            }
        };
    });