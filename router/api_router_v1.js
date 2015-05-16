'use strict';

var express = require( 'express' );
var router = express.Router();
var utils = require( '../lib/utils' );
var source = require( '../controllers/source' );

var content_ctrl = require( '../api/v1/content_ctrl' );

function auth (req, res, next) {

    var data = {};

    (req.method === 'GET' || req.method === 'DELETE') ? data = req.query : data = req.body;

    source.getById(data.sourceID, function (err, result) {
        if (!err) {
            var oldToken = utils.getMd5(result._id + result.token);
            data.token === oldToken ? next() : res.status(403).send('Incorrect token');
        } else {
            res.status(401).send('Incorrect token');
        }
    });
}

router.post( '/content', auth, content_ctrl.createContent );
router.delete( '/content', content_ctrl.delContent );
router.put( '/content', content_ctrl.updateContent );
router.get( '/content', content_ctrl.getContent );

module.exports = router;