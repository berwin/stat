'use strict';

var group = require( './group' );

exports.createGroup = function (req, res) {
    var name = req.body.name;
    var projectID = req.body.projectID;
    var types = req.body.types || [];

    group.create(name, projectID, types, function (err, result) {
        err ? res.status(403).send(err) : res.send(result[0]);
    });
};

exports.delGroup = function (req, res) {
    var groupID = req.body.id;

    group.remove(groupID, function (err, result) {
        err ? res.status(403).send(err) : res.send();
    });
};

exports.updateGroup = function (req, res) {
    var groupID = req.body.id;
    var name = req.body.name;
    
    group.update(groupID, name, function (err, result) {
        err ? res.status(403).send(err) : res.send(result);
    });
};

exports.getGroup = function (req, res) {
    var groupID = req.query.id;
    var projectID = req.query.projectID;

    if (groupID) {
        group.getGroupById(groupID, function (err, result) {
            err ? res.status(500).send(err) : res.send(result);
        });
    }
    if (projectID) {
        group.getGroupByProjectId(projectID, function (err, list) {
            err ? res.status(500).send(err) : res.send(list);
        });
    }
    if( !groupID && !projectID ){
        res.status(403).send('not groupID or projectID');
    }

};