'use strict';

var express = require( 'express' );
var router = express.Router();

var controller = require( '../api/v1/controller' );

router.get( '/test', controller.test );

router.post( '/group', controller.createGroup );
router.delete( '/group', controller.delGroup );
router.put( '/group', controller.updateGroup );
router.get( '/group', controller.getGroup );

module.exports = router;