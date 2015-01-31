'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    angular.module('stat.controllers', [])

    .controller('menuCtrl', ['$scope', 'ProjectService', function ($scope, ProjectService) {

        $scope.list = ProjectService.get();
        
    }])

    .controller('loginCtrl', ['$scope', '$location', 'RequestService', function ($scope, $location, RequestService) {

        $scope.data = { email: '', password : '' };

        $scope.login = function () {
            if( $scope.data.email && $scope.data.password ){
                NProgress.start();

                RequestService.login( $scope.data ).success(function () {

                    NProgress.done();
                    $location.path( '#/home' );

                }).error(function () {
                    NProgress.done();
                });
            }
        };

    }])

    .controller('consoleCtrl', ['$scope', function ($scope) {

        $scope.remove = function () {
            console.log(1);
        };

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