'use strict';

define(['angular', 'ngResource'], function (angular) {

    angular.module( 'stat.services', ['ngResource'] )

    .factory('ProjectService', ['$resource', function ($resource) {
        return $resource('/client/project');
    }])

    .factory('GroupService', ['$resource', function ($resource) {
        return $resource('/api/v1/group');
    }])

    .factory('ContentService', ['$resource', function ($resource) {
        return $resource('/api/v1/content');
    }])

    .factory('RequestService', ['$http', function ($http) {
        return {

            login : function (data) {
                return $http.post('/login', data);
            },
            logout : function () {
                return $http.get( '/logout' );
            }

        };
    }])

});