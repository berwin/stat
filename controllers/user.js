'use strict';

var user = require( 'user-sdk' );
var async = require( 'async' );
var utils = require( '../lib/utils' );
var config = require( '../config' );

exports.signup = function (req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    if (!mail || !password) return res.status( 409 ).send( 'Not mail or password' );

    async.parallel({
        singup : singup,
        sendMail : sendMail
    }, result);

    function singup (done) {
        user.insert({
            mail : mail,
            password : password
        }, done);
    }

    function sendMail (done) {
        var link = '';
        var html = '<!doctype html><html><head><meta charset="UTF-8"><title>Stat</title><style>#mail{font:14px/200% "";background:#fff;}#mail a{display:inline-block;width:300px;height:60px;font:18px/60px "";background:#3498db;border-radius:5px;text-align:center;color:#fff;text-decoration:none;transition:.2s linear;}#mail a:hover{background:#5dade2;}#mail a:active{background:#2980B9;}</style></head><body><div id="mail"><h1>欢迎光临 Stat</h1><p>感谢您注册了Stat，体验更全面的功能。验证您的电子邮件地址，请点击下面的链接。</p><a href="'+ link +'">邮箱验证</a><p>请注意，如果不激活,这个链接会在24小时内过期。</p><p>快乐的统计数据</p><p>Berwin</p></div></body></html>';

        utils.sendMail(mail, '激活您的Stat账户', html, done);
    }

    function result (err, result) {

        if (err) return res.status( 500 ).send( err );
        if (result.singup.code) return res.status( 409 ).send( result.singup );

        res.send();
    }
};

exports.login = function (req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    if( email === config.EMAIL && password === config.PASSWORD ){

        var token = utils.getMd5( config.USER_ID + config.MD5_SUFFIX );

        res.cookie( 'userID', config.USER_ID, { httpOnly: true });
        res.cookie( 'token', token, { httpOnly: true });

        res.send();
    }else{
        res.status( 403 ).send('Incorrect username or password');
    }
};

exports.logout = function (req, res) {
    res.clearCookie( 'userID' );
    res.clearCookie( 'token' );
    res.send();
};