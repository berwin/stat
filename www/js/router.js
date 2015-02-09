'use strict';

define(function () {
    
    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: '../templates/login.html',
            controller: 'loginCtrl'
        })

        .state('console', {
            url: '/console',
            templateUrl: '../templates/console.html',
            controller: 'consoleCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: '../templates/home.html',
            controller: 'homeCtrl'
        })

        .state('create-project', {
            url: '/create-project',
            templateUrl: '../templates/create-project.html',
            controller: 'createProjectCtrl'
        })

        .state('project', {
            url: '/project/:id/:name',
            templateUrl: '../templates/project.html',
            controller: 'projectCtrl'
        })

        

        $urlRouterProvider.otherwise( '/home' );
    };
});