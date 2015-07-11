'use strict';

define(['angular', 'ngResource'], function (angular) {

    angular.module( 'stat.services', ['ngResource'] )

    .factory('SourceService', ['$resource', function ($resource) {
        return $resource('/client/source/:id', {id: '@_id'},{
            'update': { method:'PUT' }
        });
    }])

    .factory('GroupService', ['$resource', function ($resource) {
        return $resource('/client/:sourceID/group/:id', {sourceID: '@_id', id: '@_id'},{
            'update': { method:'PUT' }
        });
    }])

    .factory('ContentService', ['$resource', function ($resource) {
        return $resource('/client/:sourceID/group/:groupID/content/:id', {sourceID: '@_id', groupID: '@_id', id: '@_id'});
    }])

    .factory('RequestService', ['$http', function ($http) {
        return {

            login : function (data) {
                return $http.post('/login', data);
            },
            logout : function () {
                return $http.get( '/logout' );
            },
            signup: function (data) {
                return $http.post('/signup', data);
            }

        };
    }])

    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.to = function (url) {
            var url_parsed = url.split("?");
            var path = url_parsed[0];
            $location.path(path);
        };
    }])

});