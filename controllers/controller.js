'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );

var config = require( '../config' );
var utils = require( '../lib/utils' );


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
