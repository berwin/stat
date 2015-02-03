'use strict';

var content = require( './content' );

exports.createContent = function (req, res) {
    var groupID = req.body.groupID;
    var projectID = req.body.projectID;
    var type = req.body.type;

    if( !groupID || !projectID || !type ) res.status(403).send('no projectID or type');

    content.create(groupID, projectID, type, function (err, result) {
        err ? res.status(500).send(err) : res.send(result[0]);
    });
};

exports.delContent = function (req, res) {
    var id = req.body.id;

    if( !id ) res.status(403).send('no id');

    content.remove(id, function (err, result) {
        err ? res.status(500).send(err) : res.send();
    });
};

exports.updateContent = function (req, res) {
    res.send('updateContent');
};

exports.getContent = function (req, res) {
    var groupID = req.query.groupID;
    var type = req.query.type;
    var firstTime = req.query.firstTime;
    var lastTime = req.query.lastTime;

    if( !groupID ) res.status(403).send('no groupID');

    function result (err, list) {
        err ? res.status(500).send(err) : res.send(list);
    }

    if( groupID && type ){
        content.getContentsByType(groupID, type, result);
    }

    if( groupID && firstTime && lastTime ){
        var ft = new Date( firstTime ).getTime();
        var lt = new Date( lastTime ).getTime();

        content.getContentsByTime(groupID, ft, lt, result);
    }

    if( groupID && !type && !firstTime && !lastTime ){
        content.getContentsByGroupId(groupID, result);
    }
};
