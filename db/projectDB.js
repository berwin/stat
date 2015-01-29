'use strict';

var mongo = require( './mongo' );
var projectDB = mongo.getCollection( 'project' );

exports.insert = function (data, callback) {
    projectDB.insert(data, callback);
};

