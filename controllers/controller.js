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

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if( email === config.EMAIL && password === config.PASSWORD ){

        var token = utils.getMd5( config.USER_ID + config.MD5_SUFFIX );

        res.cookie( 'userID', config.USER_ID, { httpOnly: true });
        res.cookie( 'token', token, { httpOnly: true });

        res.send('');
    }else{
        res.status( 403 ).send('Incorrect username or password');
    }
};


exports.isLogin = function (req, res, next) {

    var userID = req.cookies[ 'userID' ] || '';
    var clientToken = req.cookies[ 'token' ] || '';

    var serverToken = utils.getMd5( userID + config.MD5_SUFFIX );

    if( clientToken !== serverToken ){
        res.status( 403 ).send('not login');
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

    project.getProjectsByUserId( userID, function (err, list) {
        err ? res.status( 500 ).send( err ) : res.send( list );
    } );
};