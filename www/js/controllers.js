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

    .controller('consoleCtrl', ['$scope', 'ProjectService', function ($scope, ProjectService) {

        function consoleInit () {

            ProjectService.get({}, function (list) {
                $scope.list = list;

                $scope.data = {
                    name : list[0]['name'],
                    _id : list[0]['_id'],
                    token : list[0]['token']
                };
            });
        }

        consoleInit();
        

        $scope.change = function (item) {
            $scope.data = item;
        };

        $scope.remove = function (id) {
            NProgress.start();

            ProjectService.remove({id : id}, function () {
                consoleInit();
                NProgress.done();
            });
        };

    }])

    .controller('homeCtrl', ['$scope', 'ProjectService', function ($scope, ProjectService) {
        ProjectService.get({}, function (list) {
            $scope.list = list;
        });
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
    
    .controller('projectCtrl', ['$scope', function ($scope) {

    }])
});