'use strict';

var express = require( 'express' );
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var path = require('path');

var app = express();
var config = require( './config' );
var router = require( './router/router' );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( favicon( __dirname + '/www/images/favicon.ico' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( express.static( path.join( __dirname, 'www' ), { maxAge: 86400000 } ) );

router( app );


app.listen( config.LISTEN );