'use strict';

var mongo = require( './mongo' );
var contentDB = mongo.getCollection( 'content' );

exports.insert = function (data, callback) {
    contentDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    contentDB.remove({ _id : id}, callback);
};

exports.update = function (id, data, callback) {
    contentDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getGroupById = function (id, callback) {
    contentDB.findOne({ _id : id }, callback);
};