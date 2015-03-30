'use strict';

var express = require( 'express' );
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var user = require( 'user-sdk' );

var app = express();
var config = require( './config' );
var router = require( './router/router' );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( favicon( __dirname + '/www/images/favicon.ico' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'www' ), { maxAge: 86400000 } ) );

router( app );


// User Init
user.create({
    MD5_SUFFIX : config.MD5_SUFFIX,
    APPID : config.APPID,
    ENTRANCE : config.NAME
});

var server = app.listen(config.LISTEN, function () {
    var port = server.address().port
    console.log( '\x1b[32mLife listening at', port + '\x1b[0m' );
});