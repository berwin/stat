'use strict';

var async = require( 'async' );
var projectDB = require( '../db/projectDB' );
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

    projectDB.insert(obj, callback);
};

exports.remove = function (id, callback) {

    function removeGroup (projectID, cb) {

        function iterator (item, done) {
            groupDB.remove(item._id, done);
        }

        async.waterfall([
            function (done) {
                groupDB.getGroupByProjectId(projectID, done);
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
            projectDB.remove(id, done);
        },
        function (done) {
            removeGroup(id, done);
        },
        function (done) {
            contentDB.removeByProjectId(id, done);
        }
    ], callback);
};

exports.getProjectsByUserId = projectDB.getProjectsByUserId;
exports.getProjectById = projectDB.getProjectById;