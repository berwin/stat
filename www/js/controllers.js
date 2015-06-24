'use strict';

define(['angular', 'highcharts', 'moment', 'kalendae'], function (angular, highcharts, moment, kalendae) {
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
            SourceService.update($stateParams, $scope.data, function () {
                $location.path('#/source');
            });
        }

        $scope.delete = function () {
            SourceService.delete($stateParams, function () {
                $location.path('#/source');
            });
        }
    }])
    
    .controller('sourceInfoCtrl', ['$scope', '$stateParams', 'SourceService', function ($scope, $stateParams, SourceService) {
        $scope.data = SourceService.get($stateParams);
    }])

    .controller('groupListCtrl', ['$scope', '$stateParams', 'SourceService', 'GroupService', function ($scope, $stateParams, SourceService, GroupService) {
        $scope.source = SourceService.get({id : $stateParams.sourceID});
        $scope.groups = GroupService.query({sourceID : $stateParams.sourceID});
        $scope.time = moment().startOf('day').format('x') + '-' + moment().endOf('day').format('x');
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
            GroupService.save({sourceID: $stateParams.sourceID}, $scope.data, function () {
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
        $scope.group = GroupService.get($stateParams);
    }])

    .controller('groupDetailCtrl', ['$scope', '$stateParams', '$http', 'SourceService', 'GroupService', 'ContentService', function ($scope, $stateParams, $http, SourceService, GroupService, ContentService) {
        $scope.sourceID = $stateParams.sourceID;
        $scope.groupID = $stateParams.id;
        $scope.time = $stateParams.time;
        $scope.search = '';
        $scope.nowIndex = 0;

        $scope.breadcrumb = [];


        if ($stateParams.search) {
            $scope.search = $stateParams.search + ',';
            $scope.nowIndex = $stateParams.search.split(',').length;

            $scope.breadcrumb = $stateParams.search.split(',');
        }

        new Kalendae.Input('date-input', {
            months: 1,
            selected: Kalendae.moment( Number($scope.time.substring(0, $scope.time.indexOf('-'))) ),
            subscribe: {
                hide: function () {
                    var date = this.getSelected();
                    $scope.time = moment(date, 'MM/DD/YYYY').startOf('day').format('x') + '-' + moment(date, 'MM/DD/YYYY').endOf('day').format('x');
                    request($scope.time);
                }
            }
        });

        function request (time) {

            var c = 2;
            var list = [];

            $scope.source = SourceService.get({id: $scope.sourceID});
            GroupService.get({sourceID: $scope.sourceID, id: $scope.groupID, search: $stateParams.search}, function (data) {
                $scope.group = data;
                c--;
                if (c === 2) highchart(list);
            });
            $scope.content = ContentService.query({sourceID: $scope.sourceID, groupID: $scope.groupID, time: time, search: $stateParams.search});

            var url = '/client/'+ $scope.sourceID +'/group/'+ $scope.groupID +'/contentByTime/' + time + '?search=' + ($stateParams.search || '');
            $http.get(url).success(function (_list) {
                list = _list;
                c--;
                if (c === 0) highchart(list);
            });
        }
        request( $scope.time );

        function highchart (list) {
            var points = getLineChartPoints(list);

            var series = [{
                name: 'count',
                data: points
            }];

            if ($scope.group.keys[$scope.nowIndex]) {
                var keysPoints = getKeyChartPoints(list, $scope.group.keys[$scope.nowIndex].name);
                series.push({
                    name: $scope.group.keys[$scope.nowIndex].name,
                    data: keysPoints
                });
            }

            var valuesPoints = getValueChartPoints(list, $scope.group.values);
            series.push({
                name: valuesPoints[0].name,
                data: valuesPoints[0].points
            });
            series.push({
                name: valuesPoints[1].name,
                data: valuesPoints[1].points
            });

            var categories = [];
            for (var i = 0; i < 24; i++) {
                categories[i] = i + '点';
            }

            $('#chart').highcharts({
                chart: {
                    type: 'spline',
                    height: 260,
                    borderWidth: 0
                },
                credits: { enabled:false },
                legend:{enabled:false},
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
                subtitle: { text: null },
                xAxis: {
                    type : 'datetime',
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                series: series
            });
        }
    }])
});



function getLineChartPoints (list) {
    var leng = 24;

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

        for (var j = 0; j < arr.length; j++) {
            if( arr[j].hours === i ) c++;
        }

        points.push(c);
    }
    return points;
}

function getKeyChartPoints (list, key) {
    var leng = 24;

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
        var json = {};

        for (var j = 0; j < arr.length; j++) {
            if (arr[j].hours === i && !json[ arr[j].data[key] ]) {
                c++;
                json[ arr[j].data[key] ] = 1;
            }
        }

        points.push(c);
    }

    return points;
}

function getValueChartPoints (list, values) {
    var leng = 24;

    list.sort(function (a, b) {
        return a.time - b.time;
    });

    var arr = list.map(function (item) {
        item.hours = new Date(item.time).getHours();
        return item;
    });

    for (var n = 0; n < values.length; n++) {
        values[n].points = [];

        for (var i = 0; i < leng; i++) {
            var c = 0;

            for (var j = 0; j < arr.length; j++) {
                if (arr[j].hours === i && arr[j].data.value === values[n].key) {
                    c++;
                }
            }

            values[n].points.push(c);
        }
    }

    return values;
}






