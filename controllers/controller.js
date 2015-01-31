'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );
var ObjectID = require( '../db/mongo' ).ObjectID;
var config = require( '../config' );

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
        res.send({userID : config.EMAIL});
    }else{
        res.status( 403 ).send('Incorrect username or password');
    }
};


exports.createProject = function (req, res) {
    var name = req.body.name;
    var data = {
        userID : 'asdfasdf',
        name : name,
        token : ObjectID().toString()
    };

    project.create(data, function (err, result) {
        err ? res.status( 500 ).send( err ) : res.send(result[0]);
    });
    
};
exports.deleteProject = function (req, res) {
    res.send('deleteProject');
};
exports.updateProject = function (req, res) {
    res.send('updateProject');
};
exports.getProject = function (req, res) {
    res.send('getProject');
};