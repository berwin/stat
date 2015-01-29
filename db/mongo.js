'use strict';

var config = require( '../config' );
var mongoskin = require( 'mongoskin' );

var db = mongoskin.db( config.MONGO_RUL, {native_parser:true} );

exports.getCollection = function( collectionName ){
    return db.collection( collectionName );
};

exports.ObjectID = mongoskin.ObjectID;