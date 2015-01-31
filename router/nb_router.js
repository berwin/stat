/**
 * 
 * 这个路由用来写一些所有非SDK的接口，所以称为 nb_router
 * 
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var controller = require( '../controllers/controller' );

router.get( '/stat/:projectID/js', controller.getStatJS );
router.get( '/stat/:projectID/stat', controller.stat );

router.post( '/login', controller.login );

router.put( '/client/project', controller.createProject );
router.delete( '/client/project', controller.deleteProject );
router.post( '/client/project', controller.updateProject );
router.get( '/client/project', controller.getProject );

module.exports = router;