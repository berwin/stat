'use strict';
var groupDB = require( '../../db/groupDB' );
var ObjectID = require( '../../db/mongo' ).ObjectID;

exports.create = function (name, projectID, types, callback) {

    if (name && projectID) {

        var obj = {
            _id : ObjectID().toString(),
            name : name,
            projectID : projectID,
            types : types
        };

        groupDB.insert(obj, callback);

    }else{
        callback( 'no name or projectID' );
    }
};

exports.remove = function (id, callback) {
    id ? groupDB.remove(id, callback) : callback( 'no groupID' );
};

exports.update = function (id, name, callback) {

    if (id && name) {
        groupDB.update(id, {name : name}, callback);
    }else{
        callback('no groupID or name');
    }

};

exports.getGroupById = groupDB.getGroupById;
exports.getGroupByProjectId = groupDB.getGroupByProjectId;