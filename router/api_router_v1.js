'use strict';

var express = require( 'express' );
var router = express.Router();

var group_ctrl = require( '../api/v1/group_ctrl' );
var content_ctrl = require( '../api/v1/content_ctrl' );

router.post( '/group', group_ctrl.createGroup );
router.delete( '/group', group_ctrl.delGroup );
router.put( '/group', group_ctrl.updateGroup );
router.get( '/group', group_ctrl.getGroup );

router.post( '/content', content_ctrl.createContent );
router.delete( '/content', content_ctrl.delContent );
router.put( '/content', content_ctrl.updateContent );
router.get( '/content', content_ctrl.getContent );

module.exports = router;