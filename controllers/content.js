'use strict';

var async = require( 'async' ),
    groupDB = require( '../db/groupDB' ),
    contentDB = require( '../db/contentDB' ),
    ObjectID = require( '../db/mongo' ).ObjectID;


exports.queryByTime = function (groupID, firstTime, lastTime, keys, callback) {
    async.waterfall([groupInfo, getList], callback);
    var filter = {
        groupID: groupID,
        time : { $gte : firstTime, $lte : lastTime }
    };

    function groupInfo (done) {
        groupDB.getGroupById(groupID, function (err, info) {
            for (var i = 0; i < keys.length; i++) {
                filter[ 'data.'+info.keys[i].key ] = keys[i];
            }

            if (!info.keys[ keys.length ]) return done(err, info);
            done(err, info);
        });
    }

    function getList (info, done) {
        console.log(filter)
        contentDB.getContentsByfilter(filter, done);
    }
};