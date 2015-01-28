'use strict';

define(function () {
    
    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '../templates/home.html',
            controller: 'homeCtrl'
        })

        .state('demos', {
            url: '/demos',
            templateUrl: '../templates/demos.html',
            controller: 'demosCtrl'
        })

        $urlRouterProvider.otherwise( '/home' );
    };
});