'use strict';

var contentDB = require( '../../db/contentDB' );
var ObjectID = require( '../../db/mongo' ).ObjectID;

exports.create = function (groupID, projectID, type, callback) {
    if (projectID && type) {
        var time = new Date().getTime();

        var obj = {
            _id : ObjectID().toString(),
            groupID : groupID,
            projectID : projectID,
            type : type,
            time : time
        };

        contentDB.insert(obj, callback);
    }else{
        callback( 'no projectID or type' );
    }
};

exports.remove = function (id, callback) {
    id ? contentDB.remove(id, callback) : callback( 'no id' );
};

exports.getContentsByType = contentDB.getContentsByType;
exports.getContentsByGroupId = contentDB.getContentsByGroupId;
exports.getContentsByTime = contentDB.getContentsByTime;