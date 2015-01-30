'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    angular.module('stat.controllers', [])

    .controller('loginCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('consoleCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('homeCtrl', ['$scope', function ($scope) {
        
    }])

    .controller('createProjectCtrl', ['$scope', '$location', 'ProjectService', function ($scope, $location, ProjectService) {
        $scope.data = { name : '' };

        $scope.createProject = function () {

            if( $scope.data.name ){

                NProgress.start();

                ProjectService.save($scope.data, function (data) {
                    NProgress.done();
                    $location.path('#/home');
                });

            }
        };
    }])
    
});