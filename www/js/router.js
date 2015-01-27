'use strict';

define(function () {
    
    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '../templates/home.html',
            controller: 'homeCtrl'
        })

        $urlRouterProvider.otherwise( '/home' );
    };
});