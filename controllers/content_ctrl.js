'use strict';

var async = require( 'async' ),
    groupDB = require( '../db/groupDB' ),
    contentDB = require( '../db/contentDB' ),
    ObjectID = require( '../db/mongo' ).ObjectID,
    content = require('./content');

exports.createContent = function (req, res) {
    var groupID = req.body.groupID,
        sourceID = req.body.sourceID,
        data = req.body.data || {};

    data.value = data.value || '';

    if( !groupID || !sourceID ) res.status(403).send('no groupID or sourceID');

    var time = new Date().getTime();
    var obj = {
        _id : ObjectID().toString(),
        sourceID : sourceID,
        groupID : groupID,
        data: data,
        time : time
    };

    contentDB.insert(obj, function (err, result) {
        err ? res.status(500).send(err) : res.send(result[0]);
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    contentDB.remove(id, function (err, result) {
        err ? res.status(500).send(err) : res.send();
    });
};

exports.query = function (req, res) {

    var sourceID = req.params.sourceID,
        groupID = req.params.groupID,
        search = req.query.search || '',
        keys = search ? search.split(',') : [],
        time = req.query.time.split('-'),
        firstTime = Number( time[0] ),
        lastTime = Number( time[1] ),
        key = '';

    var filter = {
        sourceID: sourceID,
        groupID: groupID,
        time : { $gte : firstTime, $lte : lastTime }
    }

    async.waterfall([groupInfo, searchKeys, searchValue], result);

    function groupInfo (done) {
        groupDB.getGroupById(groupID, function (err, info) {

            for (var i = 0; i < keys.length; i++) {
                filter[ 'data.'+info.keys[i].key ] = keys[i];
            }

            if (info.keys[ keys.length ]) key = info.keys[ keys.length ].key;

            done(err, info);
        });
    }

    function searchKeys (group, done) {
        // console.log( filter, key );

        var k = key ? '$data.' + key : '$groupID';
        contentDB.getKeyList(filter, k, function (err, list) {
            done(err, group, list);
        });
    }

    function searchValue (group, list, done) {
        var arr = [];

        async.each(list, iterator, callback);

        function iterator (item, _done) {
            if (key) filter['data.'+key] = item._id;

            contentDB.getValueList(filter, function (err, _list) {
                var obj = {
                    key: key ? item._id : '',
                    count: item.count,
                    values: {}
                };

                group.values.forEach(function (_item) {
                    obj.values[_item.key] = 0; // 补全字段，把group.value里有，但_list里没有的字段设为0
                });

                _list.forEach(function (_item) {
                    var hasKey = group.values.some(function (__item) {
                        return _item._id === __item.key;
                    });

                    if (hasKey) obj.values[_item._id] = _item.count;
                });

                arr.push( obj );
                _done();
            });
        }

        function callback (err) {
            done(err, arr);
        }   
    }

    function result (err, result) {
        err ? res.status(500).send(err) : res.send(result);
    }
};

exports.queryByTime = function (req, res) {

    var sourceID = req.params.sourceID,
        groupID = req.params.groupID,
        search = req.query.search || '',
        keys = search ? search.split(',') : [],
        time = req.params.time.split('-'),
        firstTime = Number( time[0] ),
        lastTime = Number( time[1] );

    content.queryByTime(groupID, firstTime, lastTime, keys, function (err, list) {
        err ? res.status(500).send(err) : res.send(list);
    });
};






