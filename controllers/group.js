'use strict';

var async = require( 'async' ),
    groupDB = require( '../db/groupDB' ),
    contentDB = require( '../db/contentDB' ),
    ObjectID = require( '../db/mongo' ).ObjectID;

exports.create = function (name, sourceID, keys, values, callback) {

    if (name && sourceID) {

        var obj = {
            _id : ObjectID().toString(),
            name : name,
            sourceID : sourceID,
            keys : keys,
            values : values
        };

        groupDB.insert(obj, callback);

    }else{
        callback( 'no name or sourceID' );
    }
};

exports.query = function (sourceID, callback) {
    async.waterfall([getGroups, getValues], callback);

    function getGroups (done) {
        groupDB.getGroupBySourceId(sourceID, done);
    }

    function getValues (list, done) {
        async.each(list, function (item, _done) {
            var filter = {
                sourceID: item.sourceID,
                groupID: item._id
            };

            contentDB.getValueList(filter, function (err, _list) {
                item.values = merge(item.values, _list);
                _done();
            });

        }, function (err) {
            done(err, list);
        });
    }

    function merge (list, list2) {
        list.map(function (x) {
            for (var i = 0; i < list2.length; i++) {
                if (x.key === list2[i]._id) return x.count = list2[i].count;
            }
        });
        return list;
    }
};

exports.remove = groupDB.remove;
exports.update = groupDB.update;
exports.getGroupById = groupDB.getGroupById;
exports.getGroupBySourceId = groupDB.getGroupBySourceId;