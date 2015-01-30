'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );
var ObjectID = require( '../db/mongo' ).ObjectID;

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