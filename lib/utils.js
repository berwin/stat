'use strict';
var crypto = require('crypto');
var nodemailer = require( 'nodemailer' );
var config = require( '../config' );

exports.getMd5 = function( str ){
    if( str ){
        var md5 = crypto.createHash('md5');
        var result = md5.update( str ).digest('hex');
        return result;
    }else{
        return '';
    }
};

exports.sendMail = function (mail, title, html, callback) {
    var transporter = nodemailer.createTransport({
        service: config.SEND_MAIL_SERVICE,
        auth: {
            user: config.SEND_MAIL_USER,
            pass: config.SEND_MAIL_PASS
        }
    });
    var mailOptions = {
        from: config.SEND_MAIL_FROM,
        to: mail,
        subject: title,
        html: html
    };
    transporter.sendMail( mailOptions, callback );
};