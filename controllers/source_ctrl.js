'use strict';

var source = require( './source' );
var ObjectID = require( '../db/mongo' ).ObjectID;

exports.save = function (req, res) {

    var userID = req.cookies[ 'userID' ];
    var name = req.body.name;

    var data = {
        userID : userID,
        name : name,
        token : ObjectID().toString()
    };

    source.create(data, function (err, result) {
        err ? res.status( 500 ).send( err ) : res.send(result[0]);
    });
    
};
exports.remove = function (req, res) {
    var id = req.params.id;

    source.remove(id, function (err, result) {
        err ? res.status( 500 ).send( err ) : res.send();
    });
};
exports.update = function (req, res) {
    var id = req.params.id;
    var name = req.body.name;

    var data = { name : name };

    source.update(id, data, result);
    
    function result (err, result) {
        err ? res.status( 500 ).send( err ) : res.send( result );
    }
};
exports.get = function (req, res) {
    var id = req.params.id;

    function result (err, result) {
        err ? res.status( 500 ).send( err ) : res.send( result );
    }

    source.getById( id, result );
}

exports.query = function (req, res) {
    var userID = req.cookies[ 'userID' ];

    function result (err, result) {
        err ? res.status( 500 ).send( err ) : res.send( result );
    }

    source.getByUserId( userID, result );
};