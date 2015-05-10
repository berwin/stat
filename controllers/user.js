'use strict';

var user = require( 'user-sdk' );
var async = require( 'async' );
var utils = require( '../lib/utils' );
var config = require( '../config' );

exports.signup = function (req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    if (!mail || !password) return res.status( 409 ).send( 'Not mail or password' );

    async.waterfall([singup, sendMail], result);

    function singup (done) {
        user.signup({
            mail : mail,
            password : password
        }, done);
    }

    function sendMail (response, userInfo, done) {
        var status = response.statusCode;
        if (status < 200 || status >= 300 && status !== 304) return done( userInfo.message );

        var link = 'http://' + req.hostname + '/activation?userID=' + userInfo._id;
        var html = '<!doctype html><html><head><meta charset="UTF-8"><title>Stat</title><style>#mail{font:14px/200% "";background:#fff;}#mail a{display:inline-block;width:300px;height:60px;font:18px/60px "";background:#3498db;border-radius:5px;text-align:center;color:#fff;text-decoration:none;transition:.2s linear;}#mail a:hover{background:#5dade2;}#mail a:active{background:#2980B9;}</style></head><body><div id="mail"><h1>欢迎光临 Stat</h1><p>感谢您注册了Stat。验证您的电子邮件地址，请点击下面的链接。</p><a href="'+ link +'">邮箱验证</a><p>此链接永久有效。</p><p>快乐的统计数据</p><p>Berwin</p></div></body></html>';

        utils.sendMail(mail, '激活您的Stat账户', html, function (err) {
            done(err, userInfo);
        });
    }

    function result (err, result) {
        if (err) return res.status( 403 ).send( err );

        delete result.password;
        res.send(result);
    }
};

exports.activation = function (req, res) {
    var userID = req.query.userID;

    user.update({
        userID : userID,
        activate : true
    }, function (err, response, result) {
        var status = response.statusCode;

        if (status < 200 || status >= 300 && status !== 304) return res.status( status ).send( result );

        res.status( status ).send( '激活成功！' );
    });
};

exports.login = function (req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    user.signin({
        mail : mail,
        password : password
    }, function (err, response, result) {

        var status = response.statusCode;
        if (status < 200 || status >= 300 && status !== 304) return res.status( status ).send( result );

        var token = utils.getMd5( result._id + config.MD5_SUFFIX );

        res.cookie( 'userID', result._id, { httpOnly: true });
        res.cookie( 'token', token, { httpOnly: true });

        res.status( status ).send(result);
    });
};

exports.logout = function (req, res) {
    res.clearCookie( 'userID' );
    res.clearCookie( 'token' );
    res.send();
};