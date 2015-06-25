'use strict';

var async = require( 'async' );
var sourceDB = require( '../db/sourceDB' );
var groupDB = require( '../db/groupDB' );
var contentDB = require( '../db/contentDB' );
var ObjectID = require( '../db/mongo' ).ObjectID;

exports.create = function (data, callback) {

    var obj = {
        _id : ObjectID().toString(),
        userID : data.userID,
        name : data.name,
        token : data.token
    };

    sourceDB.insert(obj, callback);
};

exports.remove = function (id, callback) {

    async.parallel([
        function (done) {
            sourceDB.remove(id, done);
        },
        function (done) {
            groupDB.removeBySourceId(id, done);
        },
        function (done) {
            contentDB.removeBySourceId(id, done);
        }
    ], callback);
};

exports.update = sourceDB.update;
exports.getByUserId = sourceDB.getByUserId;
exports.getById = sourceDB.getById;