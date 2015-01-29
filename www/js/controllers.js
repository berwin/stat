'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    // Global

    NProgress.configure({ showSpinner: false });

    // End Global

    angular.module('Controllers', [])

    .controller('loginCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('homeCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('createProjectCtrl', ['$scope', function ($scope) {

        $scope.data = { text : '' };

        $scope.createProject = function () {
            NProgress.start();
            console.log($scope.data);
        };
    }])
    
});