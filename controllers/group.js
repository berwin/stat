'use strict';
var groupDB = require( '../db/groupDB' );
var ObjectID = require( '../db/mongo' ).ObjectID;

exports.create = function (name, sourceID, keys, values, callback) {

    if (name && sourceID) {

        var obj = {
            _id : ObjectID().toString(),
            name : name,
            sourceID : sourceID,
            keys : keys,
            values : values
        };

        groupDB.insert(obj, callback);

    }else{
        callback( 'no name or sourceID' );
    }
};

exports.remove = groupDB.remove;
exports.update = groupDB.update;
exports.getGroupById = groupDB.getGroupById;
exports.getGroupBySourceId = groupDB.getGroupBySourceId;