'use strict';

requirejs.config({

    paths: {
        'angular' : '../lib/angular/angular.min',
        'angular-ui-router' : '../lib/angular-ui-router/release/angular-ui-router.min',
        'jquery' : '../lib/jquery/dist/jquery.min',
        'bootstrap' : '../lib/bootstrap/dist/js/bootstrap.min'
    },

    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angular-ui-router': {
            exports: "angular-ui-router",
            deps: ["angular"]
        },
        'jquery' : {
            exports : 'jquery'
        },
        'bootstrap' : {
            exports : 'bootstrap',
            deps: ['jquery']
        }
    }
});

require(['app']);