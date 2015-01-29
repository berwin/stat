'use strict';

var api_router_v1 = require( './api_router_v1' );
var nb_router = require( './nb_router' );

module.exports = function (app) {
    app.use( '/api/v1', api_router_v1 );
    app.use( '/', nb_router );
};