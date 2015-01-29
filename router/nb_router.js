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

router.put( '/client/project', controller.createProject );
router.delete( '/client/project/:pid', controller.deleteProject );
router.post( '/client/project/:pid', controller.updateProject );
router.get( '/client/project/:pid', controller.getProject );

module.exports = router;