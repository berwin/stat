'use strict';

var express = require( 'express' );
var router = express.Router();
var controller = require( './controllers/controller' );

router.get( '/api/:projectID/js', controller.getStatJS );
router.get( '/api/:projectID/stat', controller.stat );

module.exports = router;