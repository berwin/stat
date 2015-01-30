'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    angular.module('stat.controllers', [])

    .controller('loginCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('homeCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('createProjectCtrl', ['$scope', 'ProjectService', function ($scope, ProjectService) {

        $scope.data = { name : '' };

        $scope.createProject = function () {
            NProgress.start();


            console.log($scope.data);


            ProjectService.save({}, function () {
                NProgress.done();
            });
        };
    }])
    
});