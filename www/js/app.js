'use strict';

define(['angular', './router', 'NProgress', 'angular-ui-router', 'bootstrap', './controllers', './services'], function (angular, router, NProgress) {

    // Global

    NProgress.configure({ showSpinner: false });

    // End Global

    angular.module('stat', ['ui.router', 'stat.controllers', 'stat.services'])

    .run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$locationChangeStart', function() {
            NProgress.start();
        });

        $rootScope.$on('$locationChangeSuccess', function() {
            NProgress.done();
        });
    }])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                request : function(config) {
                    NProgress.start();
                    return config;
                },

                requestError : function (rejection) {
                    return $q.reject(rejection);
                },

                response : function(response) {
                    NProgress.done();
                    return response;
                },

                responseError : function(rejection) {
                    NProgress.done();
                    if(rejection.status == 401){
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

        router($stateProvider, $urlRouterProvider);
    }]);

    angular.bootstrap(document, ['stat']);

});