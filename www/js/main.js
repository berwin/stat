'use strict';

requirejs.config({

    paths: {
        'angular' : '../lib/angular/angular.min',
        'angular-ui-router' : '../lib/angular-ui-router/release/angular-ui-router.min',
        'ngResource' : '../lib/angular-resource/angular-resource.min',
        'jquery' : '../lib/jquery/dist/jquery.min',
        'bootstrap' : '../lib/bootstrap/dist/js/bootstrap.min',
        'NProgress' : '../lib/nprogress/nprogress',
        'highcharts' : '../lib/highcharts/highcharts',
        'moment': '../lib/moment/min/moment.min'
    },

    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angular-ui-router': {
            exports: 'angular-ui-router',
            deps: ["angular"]
        },
        'ngResource' : {
            exports : 'ngResource',
            deps: ["angular"]
        },
        'jquery' : {
            exports : 'jquery'
        },
        'bootstrap' : {
            exports : 'bootstrap',
            deps: ['jquery']
        },
        'NProgress' : {
            exports : 'NProgress'
        },
        'highcharts' : {
            exports : 'highcharts',
            deps : ['jquery']
        },
        'moment': {
            exports : 'moment'
        }
    }
});

require(['app']);