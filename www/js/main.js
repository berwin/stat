'use strict';

requirejs.config({

    paths: {
        'angular' : '../lib/angular/angular',
        'angular-ui-router' : '../lib/angular-ui-router/release/angular-ui-router'
    },

    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angular-ui-router': {
            exports: "angular-ui-router",
            deps: ["angular"]
        }
    }
});

require(['app']);