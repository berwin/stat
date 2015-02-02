'use strict';
var groupDB = require( '../../db/groupDB' );
var ObjectID = require( '../../db/mongo' ).ObjectID;

exports.create = function (data, callback) {

    var name = data.name;
    var projectID = data.projectID;

    if( name && projectID ){

        var obj = {
            _id : ObjectID().toString(),
            name : name,
            projectID : projectID
        };

        groupDB.insert(obj, callback);

    }else{
        callback( 'not name or projectID' );
    }
};