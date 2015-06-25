'use strict';

var mongo = require( './mongo' );
var contentDB = mongo.getCollection( 'content' );

exports.insert = function (data, callback) {
    contentDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    contentDB.remove({ _id : id}, callback);
};

exports.removeBySourceId = function (sourceID, callback) {
    contentDB.remove({ sourceID : sourceID}, callback);
};

exports.removeByGroupId = function (groupID, callback) {
    contentDB.remove({ groupID : groupID}, callback);
};

exports.update = function (id, data, callback) {
    contentDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getKeyList = function (filter, key, callback) {
    contentDB.aggregate({$match: filter}, {$group : {_id : key, count : {$sum : 1}}}, callback);
};

exports.getValueList = function (filter, callback) {
    contentDB.aggregate({$match: filter}, {$group : {_id : '$data.value', count : {$sum : 1}}}, callback);
};

exports.getContentsByfilter = function (filter, callback) {
    contentDB.find(filter).toArray(callback);
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

exports.getContentsBySourceId = function (sourceID, callback) {
    contentDB.find({ sourceID : sourceID }).toArray(callback);
};

exports.getContentsBySourceTime = function (sourceID, firstTime, lastTime, callback) {
    contentDB.find({ sourceID : sourceID, time : { $gte : firstTime, $lte : lastTime } }).toArray(callback);
};