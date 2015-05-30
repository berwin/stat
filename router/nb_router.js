/**
 * 
 * 这个路由用来写一些所有非SDK的接口，所以称为 nb_router
 * 
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var controller = require( '../controllers/controller' );
var user = require( '../controllers/user' );
var source = require( '../controllers/source_ctrl' );
var group = require( '../controllers/group_ctrl' );
var content = require( '../controllers/content_ctrl' );

router.get( '/stat/:projectID/js', controller.getStatJS );
router.get( '/stat/:projectID/stat', controller.stat );

router.post( '/signup', user.signup );
router.get( '/activation', user.activation );
router.post( '/login', user.login );
router.get( '/logout', user.logout );

router.all('/client/*', controller.isLogin );

router.post( '/client/source', source.save );
router.get( '/client/source',  source.query );
router.get( '/client/source/:id',  source.get );
router.delete( '/client/source/:id',  source.remove );
router.put( '/client/source/:id',  source.update );

router.post( '/client/:sourceID/group', group.create );
router.get( '/client/:sourceID/group', group.query );
router.get( '/client/:sourceID/group/:id', group.get );
router.delete( '/client/:sourceID/group/:id', group.remove );
router.put( '/client/:sourceID/group/:id', group.update );

router.get('/client/:sourceID/group/:groupID/content', content.query);
router.delete( '/client/:sourceID/group/:groupID/content/:id', content.delete );

module.exports = router;