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

    function removeGroup (sourceID, cb) {

        function iterator (item, done) {
            groupDB.remove(item._id, done);
        }

        async.waterfall([
            function (done) {
                groupDB.getGroupBySourceId(sourceID, done);
            },
            function (list, done) {
                async.each(list, iterator, function (err) {
                    err ? done(err) : done(null);
                });
            }
        ], function (err, result) {
            cb(err, result);
        });
    }

    async.parallel([
        function (done) {
            sourceDB.remove(id, done);
        },
        function (done) {
            removeGroup(id, done);
        },
        function (done) {
            contentDB.removeBySourceId(id, done);
        }
    ], callback);
};

exports.update = sourceDB.update;
exports.getByUserId = sourceDB.getByUserId;
exports.getById = sourceDB.getById;