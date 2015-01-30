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

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        router($stateProvider, $urlRouterProvider);
    }]);

    angular.bootstrap(document, ['stat']);

});