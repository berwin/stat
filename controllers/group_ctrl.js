'use strict';

var group = require( './group' );

exports.create = function (req, res) {
    var sourceID = req.params.sourceID;
    var name = req.body.name;
    var keys = req.body.keys || [];
    var values = req.body.values || [];

    group.create(name, sourceID, keys, values, function (err, result) {
        err ? res.status(403).send(err) : res.send(result[0]);
    });
};

exports.query = function (req, res) {
    var sourceID = req.params.sourceID;

    group.getGroupBySourceId(sourceID, function (err, list) {
        err ? res.status(500).send(err) : res.send(list);
    });
};

exports.get = function (req, res) {
    var id = req.params.id;
    
    group.getGroupById(id, function (err, result) {
        err ? res.status(500).send(err) : res.send(result);
    });
};

exports.remove = function (req, res) {
    var id = req.params.id;

    group.remove(id, function (err, result) {
        err ? res.status(403).send(err) : res.send();
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var keys = req.body.keys;
    var values = req.body.values;
    
    var data = {
        name : name,
        keys : keys,
        values : values
    };

    group.update(id, data, function (err, result) {
        err ? res.status(403).send(err) : res.send(result);
    });
};
