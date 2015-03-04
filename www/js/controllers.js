'use strict';

define(['angular', 'NProgress', 'highcharts'], function (angular, NProgress, highcharts) {

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

    .controller('homeCtrl', ['$scope', 'ProjectService', '$location', function ($scope, ProjectService, $location) {
        ProjectService.query({}, function (list) {
            $scope.list = list;
            $location.path('/project/'+ list[0]._id +'/' + list[0].name);
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

        function getToday (str) {
            var nowDate = null;
            str ? nowDate = new Date(str) : nowDate = new Date();

            var newDateStr = nowDate.getFullYear() + '-' + ( nowDate.getMonth()+1 ) + '-' + nowDate.getDate();

            return {
                firstTime : newDateStr + '-00:00:00',
                lastTime : newDateStr + '-23:59:59'
            }
        }

        var oDate = getToday();

        $scope.project = ProjectService.get({id : id});

        function iterator (item, i, arr) {
            ContentService.query({groupID: item._id, firstTime : oDate.firstTime, lastTime : oDate.lastTime}, function (list) {
                item.contents = list;
            });
            ContentService.query({groupID: item._id}, function (list) {
                item.count = list.length;
            });
        }

        GroupService.query({projectID : id}, function (list) {
            $scope.groups = list;

            list.forEach(iterator);

            renderChart(24, list[0], oDate.firstTime, oDate.lastTime);
        });


        // Click tab

        $scope.tabStat = function (group) {
            renderChart(24, group, oDate.firstTime, oDate.lastTime);
        };

        // Highcharts

        function renderChart (leng, group, firstTime, lastTime) {

            var data = {
                yesterDay : [],
                toDay : [],
                async : 0
            };

            ContentService.query({groupID: group._id, firstTime : firstTime, lastTime : lastTime}, function (list) {
                data.async++;
                data.toDay = list;

                if (data.async === 2) highchart(data);

            });

            var yesterDayTime = new Date(firstTime).getTime() - 86400000;
            var yesterDayDate = getToday(yesterDayTime);

            ContentService.query({groupID: group._id, firstTime : yesterDayDate.firstTime, lastTime : yesterDayDate.lastTime}, function (list) {
                data.async++;
                data.yesterDay = list;
                if (data.async === 2) highchart(data);
            });

            function getLineChartPoints (list) {
                list.sort(function (a, b) {
                    return a.time - b.time;
                });

                var arr = list.map(function (item) {
                    item.hours = new Date(item.time).getHours();
                    return item;
                });

                var points = [];
                for (var i = 0; i < leng; i++) {
                    var c = 0;

                    for (var j = 0; j <arr .length; j++) {
                        if( arr[j].hours === i ) c++;
                    }

                    points.push(c);
                }
                return points;
            }

            function getColumnPoints (list) {

                function hasColumnName (arr, item) {
                    var temp = false;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].name === item) temp = true;
                    }
                    return temp;
                }

                var columns = [];

                for (var i = 0; i < list.length; i++) {
                    
                    if (hasColumnName(columns, list[i].type)) {
                        for (var j = 0; j < columns.length; j++) {
                            if (columns[j].name === list[i].type) columns[j].y++;
                        };
                    } else {
                        var obj = { name : list[i].type , y : 1 };
                        columns.push( obj );
                    }
                };

                // default
                if (columns.length === 0 && group.types.length > 0) {
                    for (var i = 0; i < group.types.length; i++) {
                        columns.push({ name : group.types[i], y : 0 });
                    }
                } else {
                    columns.push({ name : 'default', y : 0 });
                }

                return columns;
            }

            function highchart (data) {

                // Line Charts

                var todayPoints = getLineChartPoints(data.toDay);
                var yesterDay = getLineChartPoints(data.yesterDay);

                var categories = [];
                for (var i = 0; i < leng; i++) {
                    categories[i] = i + '点';
                }

                $('#basics-chart').highcharts({
                    title: {
                        text: group.name,
                        x: -20 //center
                    },
                    yAxis: { title: { text : ''} },
                    credits: { enabled:false },
                    xAxis: {
                        categories: categories
                    },
                    tooltip: {
                        valueSuffix: '条'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: { enabled: true },
                            marker: { enabled: false }
                        }
                    },
                    series: [{
                        name: '今天',
                        data: todayPoints
                    }, {
                        name: '昨天',
                        data: yesterDay
                    }]
                });


                // Column Charts

                var columns = getColumnPoints(data.toDay);

                $('#column').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: group.name
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: { title: { text: '' } },
                    credits: { enabled:false },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.0f}'
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> 条数据<br/>'
                    },

                    series: [{
                        name: group.name,
                        colorByPoint: true,
                        data: columns
                    }]
                });
            }
        }

    }])

    .controller('createGroupCtrl', ['$scope', '$location', 'ProjectService', 'GroupService', function ($scope, $location, ProjectService, GroupService) {
        ProjectService.query({}, function (list) {
            $scope.list = list;
        });

        $scope.change = function (item) {
            $scope.project = item;
        };

        $scope.data = {name : '', types : ''};

        $scope.create = function () {
            if (!$scope.project || !$scope.data.name) return;

            var data = {
                projectID : $scope.project._id,
                name : $scope.data.name
            };

            if (!!$scope.data.types) {
                data.types = $scope.data.types.split(',');
            };
            

            NProgress.start();

            GroupService.save(data, function () {
                NProgress.done();
                $location.path( '/project/' + $scope.project._id + '/' + $scope.project.name );
            });
        };

    }])
});