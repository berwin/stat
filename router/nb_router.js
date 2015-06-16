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

// -- source

router.route( '/client/source' )
    .post( source.save )
    .get( source.query );

router.route( '/client/source/:id' )
    .get( source.get )
    .delete( source.remove )
    .put( source.update );

// -- group

router.route( '/client/:sourceID/group' )
    .post( group.create )
    .get( group.query );

router.route( '/client/:sourceID/group/:id' )
    .get( group.get )
    .delete( group.remove )
    .put( group.update );


router.get('/client/:sourceID/group/:groupID/content', content.query);
router.get('/client/:sourceID/group/:groupID/contentByTime/:time', content.queryByTime);
router.delete( '/client/:sourceID/group/:groupID/content/:id', content.delete );

module.exports = router;