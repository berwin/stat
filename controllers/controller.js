'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );
var ObjectID = require( '../db/mongo' ).ObjectID;

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
        name : name,
        token : ObjectID()
    };
    
};
exports.deleteProject = function (req, res) {
    
};
exports.updateProject = function (req, res) {
    
};
exports.getProject = function (req, res) {
    res.send('getProject');
};