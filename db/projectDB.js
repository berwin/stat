'use strict';

var mongo = require( './mongo' );
var projectDB = mongo.getCollection( 'project' );

exports.insert = function (data, callback) {
    projectDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    projectDB.remove({ _id : id }, callback);
};

exports.update = function (id, data, callback) {
    projectDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getProjectById = function (id, callback) {
    projectDB.findOne({ _id : id }, callback);
};

exports.getProjectsByUserId = function (userID, callback) {
    projectDB.find({userID : userID}).toArray(callback);
};