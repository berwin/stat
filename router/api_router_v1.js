'use strict';

var express = require( 'express' );
var router = express.Router();

var group_ctrl = require( '../api/v1/group_ctrl' );

router.get( '/test', group_ctrl.test );

router.post( '/group', group_ctrl.createGroup );
router.delete( '/group', group_ctrl.delGroup );
router.put( '/group', group_ctrl.updateGroup );
router.get( '/group', group_ctrl.getGroup );

module.exports = router;