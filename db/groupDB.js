'use strict';

var mongo = require( './mongo' );
var groupDB = mongo.getCollection( 'group' );

exports.insert = function (data, callback) {
    groupDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    groupDB.remove({ _id : id }, callback);
};

exports.update = function (id, data, callback) {
    groupDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getGroupById = function (id, callback) {
    groupDB.findOne({ _id : id }, callback);
};

exports.getGroupBySourceId = function (id, callback) {
    groupDB.find({ sourceID : id }).toArray(callback);
};