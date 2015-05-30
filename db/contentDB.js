'use strict';

var mongo = require( './mongo' );
var contentDB = mongo.getCollection( 'content' );

exports.insert = function (data, callback) {
    contentDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    contentDB.remove({ _id : id}, callback);
};

exports.removeBySourceId = function (projectID, callback) {
    contentDB.remove({ projectID : projectID}, callback);
};

exports.update = function (id, data, callback) {
    contentDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getKeyCount = function (key, sourceID, groupID, callback) {
    contentDB.aggregate({$match: {sourceID: sourceID, groupID: groupID}}, {$group : {_id : key, count : {$sum : 1}}}, callback);
};

exports.getValueCount = function (k, v, sourceID, groupID, callback) {
    var filter = {sourceID: sourceID, groupID: groupID};
    filter[k] = v;
    contentDB.aggregate({$match: filter}, {$group : {_id : '$data.value', count : {$sum : 1}}}, callback);
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

exports.getContentsByProjectId = function (projectID, callback) {
    contentDB.find({ projectID : projectID }).toArray(callback);
};

exports.getContentsByProjectTime = function (projectID, firstTime, lastTime, callback) {
    contentDB.find({ projectID : projectID, time : { $gte : firstTime, $lte : lastTime } }).toArray(callback);
};