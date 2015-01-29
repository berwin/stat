'use strict';

var express = require( 'express' );
var router = express.Router();

var controller = require( '../controllers/controller' );
var api_router_v1 = require( './api_router_v1' );


router.get( '/stat/:projectID/js', controller.getStatJS );
router.get( '/stat/:projectID/stat', controller.stat );

router.put( '/client/project', controller.createProject );
router.delete( '/client/project/:pid', controller.deleteProject );
router.post( '/client/project/:pid', controller.updateProject );
router.get( '/client/project/:pid', controller.getProject );


module.exports = function (app) {
    app.use( '/api/v1', api_router_v1 );
    app.use( '/', router );
};