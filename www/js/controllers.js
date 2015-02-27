'use strict';

define(['angular', 'NProgress'], function (angular, NProgress) {

    angular.module('stat.controllers', [])

    .controller('navCtrl', ['$scope', '$location', 'RequestService', function ($scope, $location, RequestService) {

        $scope.logout = function () {
            NProgress.start();

            RequestService.logout().success(function () {

                NProgress.done();
                $location.path( '/login' );

            }).error(function () {
                NProgress.done();
            });
        };

    }])

    .controller('menuCtrl', ['$scope', '$stateParams', 'ProjectService', function ($scope, $stateParams, ProjectService) {
        ProjectService.query({}, function (list) {

            list.forEach(function (item, i, arr) {
                if( item.name === $stateParams.name ) item.active = 'active';
            });

            $scope.list = list;
        });
    }])

    .controller('loginCtrl', ['$scope', '$location', 'RequestService', function ($scope, $location, RequestService) {

        $scope.data = { email: '', password : '' };

        $scope.login = function () {
            if( $scope.data.email && $scope.data.password ){
                NProgress.start();

                RequestService.login( $scope.data ).success(function () {

                    NProgress.done();
                    $location.path( '/home' );

                }).error(function () {
                    NProgress.done();
                });
            }
        };

    }])

    .controller('consoleCtrl', ['$scope', 'ProjectService', 'GroupService', function ($scope, ProjectService, GroupService) {

        function consoleInit () {

            ProjectService.query({}, function (list) {
                $scope.list = list;

                $scope.data = {
                    name : list[0]['name'],
                    _id : list[0]['_id'],
                    token : list[0]['token']
                };

                gruopsInit($scope.data._id);
            });

        }

        function gruopsInit (projectID) {
            GroupService.query({projectID : projectID}, function (list) {
                $scope.groups = list;
            });
        }

        consoleInit();

        $scope.change = function (item) {
            $scope.data = item;
            gruopsInit(item._id);
        };

        // delete project

        $scope.remove = function (id) {
            NProgress.start();

            ProjectService.remove({id : id}, function () {
                consoleInit();
                NProgress.done();
            });
        };

        // delete group

        $scope.delete = function (item) {
            NProgress.start();
            
            GroupService.remove({id : item._id}, function () {
                consoleInit();
                NProgress.done();
            });
        };

    }])

    .controller('homeCtrl', ['$scope', 'ProjectService', function ($scope, ProjectService) {
        ProjectService.query({}, function (list) {
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
                    $location.path('/home');
                });

            }
        };
    }])
    
    .controller('projectCtrl', ['$scope', '$stateParams', 'ProjectService', 'GroupService', 'ContentService', function ($scope, $stateParams, ProjectService, GroupService, ContentService) {
        var id = $stateParams.id;

        function getNowDate () {
            var nowDate = new Date();
            var newDateStr = nowDate.getFullYear() + '-' + ( nowDate.getMonth()+1 ) + '-' + nowDate.getDate();

            return {
                firstTime : newDateStr + '-00:00:00',
                lastTime : newDateStr + '-23:59:59'
            }
        }

        var oDate = getNowDate();

        $scope.project = ProjectService.get({id : id});

        function iterator (item, i, arr) {
            ContentService.query({groupID: item._id, firstTime : oDate.firstTime, lastTime : oDate.lastTime}, function (list) {
                item.contents = list;
            });
        }

        GroupService.query({projectID : id}, function (list) {
            $scope.group = list;

            list.forEach(iterator);
        });

    }])
});