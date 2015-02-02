'use strict';

var content = require( './content' );

exports.createContent = function (req, res) {
    res.send('createContent');
};

exports.delContent = function (req, res) {
    res.send('delContent');
};

exports.updateContent = function (req, res) {
    res.send('updateContent');
};

exports.getContent = function (req, res) {
    res.send('getContent');
};
