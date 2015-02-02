'use strict';

var group = require( './group' );

exports.test = function (req, res) {
    res.send( 'test: This message comes from -> api/v1/controller\n' );
};

exports.createGroup = function (req, res) {
    group.create(req.body, function (err, result) {
        err ? res.status(403).send(err) : res.send(result[0]);
    });
};

exports.delGroup = function (req, res) {};

exports.updateGroup = function (req, res) {};

exports.getGroup = function (req, res) {};