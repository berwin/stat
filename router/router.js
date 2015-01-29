'use strict';

var express = require( 'express' );
var router = express.Router();

var controller = require( '../controllers/controller' );
var api_router_v1 = require( './api_router_v1' );


router.get( '/stat/:projectID/js', controller.getStatJS );
router.get( '/stat/:projectID/stat', controller.stat );

module.exports = function (app) {
    app.use( '/api/v1', api_router_v1 );
    app.use( '/', router );
};