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

        .state('help', {
            url: '/help',
            templateUrl: '../templates/help.html'
        })

        .state('source-list', {
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

        .state('group-list', {
            url: '/source/:sourceID',
            templateUrl: '../templates/group/list.html',
            controller: 'groupListCtrl'
        })
        .state('group-create', {
            url: '/source/:sourceID/create',
            templateUrl: '../templates/group/create.html',
            controller: 'createGroupCtrl'
        })
        .state('group-edit', {
            url: '/source/:sourceID/:id/edit',
            templateUrl: '../templates/group/create.html',
            controller: 'editGroupCtrl'
        })
        .state('group-info', {
            url: '/source/:sourceID/:id/info',
            templateUrl: '../templates/group/info.html',
            controller: 'infoGroupCtrl'
        })
        .state('group-detail', {
            url: '/source/:sourceID/:id/:time',
            templateUrl: '../templates/group/detail.html',
            controller: 'groupDetailCtrl'
        })
        .state('group-detail-search', {
            url: '/source/:sourceID/:id/:time/:search',
            templateUrl: '../templates/group/detail.html',
            controller: 'groupDetailCtrl'
        })
        

        $urlRouterProvider.otherwise( '/source' );
    };
});