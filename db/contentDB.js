'use strict';

var mongo = require( './mongo' );
var contentDB = mongo.getCollection( 'content' );

exports.insert = function (data, callback) {
    contentDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    contentDB.remove({ _id : id}, callback);
};

exports.removeByProjectId = function (projectID, callback) {
    contentDB.remove({ projectID : projectID}, callback);
};

exports.update = function (id, data, callback) {
    contentDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getContentsByType = function (groupID, type, callback) {
    contentDB.find({ groupID : groupID, type : type }).toArray(callback);
};

exports.getContentsByGroupId = function (groupID, callback) {
    contentDB.find({ groupID : groupID }).toArray(callback);
};

exports.getContentsByTime = function (groupID, firstTime, lastTime, callback) {
    contentDB.find({ groupID : groupID, time : { $gte : firstTime, $lte : lastTime } }).toArray(callback);
};