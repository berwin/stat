'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );
var ObjectID = require( '../db/mongo' ).ObjectID;
var config = require( '../config' );
var utils = require( '../lib/utils' );

var project = require( './project' );

exports.getStatJS = function (req, res) {
    var templateJS = ejs.compile( fs.readFileSync(path.join(__dirname, '../views/stat.js.ejs'), 'utf8') );
    res.set('Content-Type', 'application/javascript');
    res.send( templateJS({host: req.headers.host}) );
};

exports.stat = function (req, res) {

    var ip = req.headers[ 'X-Real-IP' ] || req.ip;

    res.jsonp({});
};

exports.isLogin = function (req, res, next) {

    var userID = req.cookies[ 'userID' ] || '';
    var clientToken = req.cookies[ 'token' ] || '';

    var serverToken = utils.getMd5( userID + config.MD5_SUFFIX );

    if( clientToken !== serverToken ){
        res.status( 401 ).send('not login');
    }else{
        next();
    }

};

exports.createProject = function (req, res) {

    var userID = req.cookies[ 'userID' ];
    var name = req.body.name;

    var data = {
        userID : userID,
        name : name,
        token : ObjectID().toString()
    };

    project.create(data, function (err, result) {
        err ? res.status( 500 ).send( err ) : res.send(result[0]);
    });
    
};
exports.deleteProject = function (req, res) {
    var id = req.query.id;

    project.remove(id, function (err, result) {
        err ? res.status( 500 ).send( err ) : res.send();
    });
};
exports.updateProject = function (req, res) {
    res.send('updateProject');
};
exports.getProjectsByUserId = function (req, res) {

    var userID = req.cookies[ 'userID' ];

    var id = req.query.id;

    function result (err, result) {
        err ? res.status( 500 ).send( err ) : res.send( result );
    }

    if (id) {
        project.getProjectById( id, result );
    } else {
        project.getProjectsByUserId( userID, result );
    }

};