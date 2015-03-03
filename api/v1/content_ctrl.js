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
    var id = req.query.id;

    if( !id ) res.status(403).send('no id');

    content.remove(id, function (err, result) {
        err ? res.status(500).send(err) : res.send();
    });
};

exports.updateContent = function (req, res) {
    res.send('updateContent');
};

exports.getContent = function (req, res) {
    var projectID = req.query.projectID;
    var groupID = req.query.groupID;
    var type = req.query.type;
    var firstTime = req.query.firstTime;
    var lastTime = req.query.lastTime;

    if( !groupID && !projectID ) res.status(403).send('no groupID');

    function result (err, list) {
        err ? res.status(500).send(err) : res.send(list);
    }

    if( groupID && type ){
        content.getContentsByType(groupID, type, result);
    }

    if( firstTime && lastTime ){
        var ft = new Date( firstTime ).getTime();
        var lt = new Date( lastTime ).getTime();

        groupID ? 
            content.getContentsByTime(groupID, ft, lt, result) : 
            content.getContentsByProjectTime(projectID, ft, lt, result);
    }

    if( !type && !firstTime && !lastTime ){
        content.getContentsByGroupId(groupID, result);

        groupID ?
            content.getContentsByGroupId(groupID, result) : 
            content.getContentsByProjectId(projectID, result);
    }

};
