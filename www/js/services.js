'use strict';

define(['angular', 'ngResource'], function (angular) {

    angular.module( 'stat.services', ['ngResource'] )

    .factory('ProjectService', ['$resource', function($resource){
        return $resource('/client/project', {}, {
            save : {method: 'PUT'},
            update : {method: 'POST'}
        });
    }])

});