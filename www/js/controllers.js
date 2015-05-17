'use strict';

define(['angular', 'highcharts'], function (angular, highcharts) {

    angular.module('stat.controllers', [])

    .controller('navCtrl', ['$scope', '$location', 'RequestService', function ($scope, $location, RequestService) {

        $scope.logout = function () {
            RequestService.logout().success(function () {
                $location.path( '/login' );
            });
        };

    }])

    .controller('menuCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.isActive = function (url) {
            return window.location.hash.indexOf(url) !== -1;
        };
    }])

    .controller('loginCtrl', ['$scope', '$location', 'RequestService', function ($scope, $location, RequestService) {

        $scope.data = { mail: '', password : '' };

        $scope.login = function () {
            if( $scope.data.mail && $scope.data.password ){

                RequestService.login( $scope.data ).success(function () {
                    $location.path( '/source' );
                });
            }
        };

    }])

    .controller('signupCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.data = { mail : '', password : '', confirm : '' };
        $scope.err = { mail : '', password : '', confirm : '' };


        function send () {
            for (var i in $scope.err) {
                if ($scope.err[i] === 'err') return;
            }

            $http.post('/signup', $scope.data).success(function (data) {
                $location.path( '/login' );
            });
        }

        $scope.signup = function () {

            for (var i in $scope.data ) {
                if (!$scope.data[i]) {
                    $scope.err[ i ] = 'err';
                } else {
                    $scope.err[ i ] = '';
                }
            }

            if (!/(.+@.+(\.[a-z]+){1,2})/.test( $scope.data.mail )) $scope.err.mail = 'err';

            if ($scope.data.password !== $scope.data.confirm) $scope.err.confirm = 'err';

            send();
        };
    }])

    .controller('sourceCtrl', ['$scope', 'SourceService', '$location', function ($scope, SourceService, $location) {
        $scope.list = SourceService.query();
    }])

    .controller('sourceCreateCtrl', ['$scope', '$location', 'SourceService', function ($scope, $location, SourceService) {
        $scope.data = { name : '' };

        $scope.createSource = function () {
            if (!$scope.data.name) return;

            SourceService.save($scope.data, function (data) {
                $location.path('/source');
            });
        };
    }])

    .controller('sourceEditCtrl', ['$scope', '$stateParams', '$location', 'SourceService', function ($scope, $stateParams, $location, SourceService) {
        $scope.data = SourceService.get($stateParams);

        $scope.update = function () {
            SourceService.update($stateParams, $scope.data);
        }

        $scope.delete = function () {
            SourceService.delete($stateParams, function () {
                $location.path('/');
            });
        }
    }])
    
    .controller('sourceInfoCtrl', ['$scope', '$stateParams', 'SourceService', function ($scope, $stateParams, SourceService) {
        $scope.data = SourceService.get($stateParams);
    }])

    .controller('groupListCtrl', ['$scope', '$stateParams', 'SourceService', 'GroupService', function ($scope, $stateParams, SourceService, GroupService) {
        $scope.source = SourceService.get({id : $stateParams.sourceID});
        $scope.groups = GroupService.query();
    }])

    .controller('createGroupCtrl', ['$scope', '$location', '$stateParams', 'SourceService', 'GroupService', function ($scope, $location, $stateParams, SourceService, GroupService) {
        $scope.type = 'create';
        var sourceID = $stateParams.sourceID;
        $scope.source = SourceService.get({id: sourceID});
        $scope.data = { name : '', sourceID : sourceID, keys : [{key : '', name : '', count : 0}], values : [{key : '', name : '', count : 0}] };

        $scope.addKey = function () {
            $scope.data.keys.push({ key : '', name : '', count : 0 });
        };
        $scope.delKey = function (i) {
            $scope.data.keys.splice(i, 1);
        };

        $scope.addVal = function () {
            $scope.data.values.push({ key : '', name : '', count : 0});
        };
        $scope.delVal = function (i) {
            $scope.data.values.splice(i, 1);
        };

        $scope.send = function () {
            GroupService.save($scope.data, function () {
                $location.path( '/source/' + sourceID );
            });
        };

    }])

    .controller('editGroupCtrl', ['$scope', '$location', '$stateParams', 'SourceService', 'GroupService', function ($scope, $location, $stateParams, SourceService, GroupService) {
        $scope.type = 'edit';
        var sourceID = $stateParams.sourceID;
        $scope.source = SourceService.get({id: sourceID});
        $scope.data = GroupService.get($stateParams);

        $scope.addKey = function () {
            $scope.data.keys.push({ key : '', name : '', count : 0 });
        };
        $scope.delKey = function (i) {
            $scope.data.keys.splice(i, 1);
        };

        $scope.addVal = function () {
            $scope.data.values.push({ key : '', name : '', count : 0});
        };
        $scope.delVal = function (i) {
            $scope.data.values.splice(i, 1);
        };

        $scope.send = function () {
            GroupService.update($scope.data, function () {
                $location.path( '/source/' + sourceID );
            });
        };
        $scope.del = function () {
            GroupService.delete($stateParams, function () {
                $location.path( '/source/' + sourceID );
            });
        };
    }])
    
    .controller('infoGroupCtrl', ['$scope', '$stateParams', 'SourceService', 'GroupService', function ($scope, $stateParams, SourceService, GroupService) {
        $scope.source = SourceService.get({id: $stateParams.sourceID});
        $scope.data = GroupService.get($stateParams);
    }])

    .controller('groupDetailCtrl', ['$scope', '$stateParams', 'SourceService', 'GroupService', 'ContentService', function ($scope, $stateParams, SourceService, GroupService, ContentService) {
        $scope.source = SourceService.get({id: $stateParams.sourceID});
        $scope.group = GroupService.get($stateParams);

        $('#chart').highcharts({
            chart: {
                type: 'spline',
                borderWidth: 0
            },
            title: {text: null},
            tooltip: {
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                shadow: false,
                                radius: 2
                            }
                        }
                    },
                    lineWidth : 1
                }
            },
            subtitle: {
                text: null
            },
            xAxis: {
                type : 'datetime'
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            legend:{
                enabled:false
             },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    }])
});