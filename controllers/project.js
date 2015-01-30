'use strict';

var projectDB = require( '../db/projectDB' );

exports.create = function (data, callback) {

    var obj = {
        userID : data.userID,
        name : data.name,
        token : data.token
    };

    projectDB.insert(obj, callback);
};