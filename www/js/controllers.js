'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    angular.module('stat.controllers', [])

    .controller('loginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        
        $scope.data = { email: '', password : '' };

        $scope.login = function () {
            if( $scope.data.email && $scope.data.password ){
                NProgress.start();

                $http.post('/login', $scope.data).success(function () {

                    NProgress.done();
                    $location.path( '#/home' );
                    
                }).error(function () {
                    NProgress.done();
                });
            }
        };

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