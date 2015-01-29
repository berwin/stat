'use strict';

var express = require( 'express' );
var router = express.Router();

var controller = require( '../api/v1/controller' );

router.get( '/test', controller.test );

module.exports = router;