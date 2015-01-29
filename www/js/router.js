'use strict';

define(function () {
    
    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: '../templates/login.html',
            controller: 'loginCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: '../templates/home.html',
            controller: 'homeCtrl'
        })

        .state('project', {
            url: '/create-project',
            templateUrl: '../templates/create-project.html',
            controller: 'createProjectCtrl'
        })

        

        $urlRouterProvider.otherwise( '/home' );
    };
});