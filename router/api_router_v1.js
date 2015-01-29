'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/test', function (req, res) {
    res.send( '222' );
} );

module.exports = router;