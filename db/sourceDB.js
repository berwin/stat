'use strict';

var mongo = require( './mongo' );
var sourceDB = mongo.getCollection( 'source' );

exports.insert = function (data, callback) {
    sourceDB.insert(data, callback);
};

exports.remove = function (id, callback) {
    sourceDB.remove({ _id : id }, callback);
};

exports.update = function (id, data, callback) {
    sourceDB.findAndModify({ _id : id }, [], { $set : data }, { upsert : true, new : true }, callback);
};

exports.getById = function (id, callback) {
    sourceDB.findOne({ _id : id }, callback);
};

exports.getByUserId = function (userID, callback) {
    sourceDB.find({ userID : userID }).toArray(callback);
};