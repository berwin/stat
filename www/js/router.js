'use strict';

define(function () {
    
    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: '../templates/login.html',
            controller: 'loginCtrl'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: '../templates/signup.html',
            controller: 'signupCtrl'
        })

        .state('console', {
            url: '/console',
            templateUrl: '../templates/console.html',
            controller: 'consoleCtrl'
        })

        .state('source', {
            url: '/source',
            templateUrl: '../templates/source/source.html',
            controller: 'sourceCtrl'
        })

        .state('source-create', {
            url: '/source/create',
            templateUrl: '../templates/source/source-create.html',
            controller: 'sourceCreateCtrl'
        })

        .state('source-edit', {
            url: '/source/:id/edit',
            templateUrl: '../templates/source/source-edit.html',
            controller: 'sourceEditCtrl'
        })

        .state('source-info', {
            url: '/source/:id/info',
            templateUrl: '../templates/source/source-info.html',
            controller: 'sourceInfoCtrl'
        })

        .state('source-detail', {
            url: '/source/:id',
            templateUrl: '../templates/source/source-detail.html',
            controller: 'sourceDetailCtrl'
        })

        .state('create-group', {
            url: '/source/:sourceID/create',
            templateUrl: '../templates/group/create.html',
            controller: 'createGroupCtrl'
        })
        

        $urlRouterProvider.otherwise( '/source' );
    };
});