'use strict';

var projectDB = require( '../db/projectDB' );
var ObjectID = require( '../db/mongo' ).ObjectID;

exports.create = function (data, callback) {

    var obj = {
        _id : ObjectID().toString(),
        userID : data.userID,
        name : data.name,
        token : data.token
    };

    projectDB.insert(obj, callback);
};

exports.getProjectsByUserId = projectDB.getProjectsByUserId;