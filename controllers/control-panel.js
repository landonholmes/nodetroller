var express = require('express');
var router = express.Router();

var utils = require('..//helpers/utils');


router.get('/', function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'control-panel'});
});

router.get('/listDir', function(req, res){
    listDir(function(r){
        res.send(r);
    });
});


function listDir(callback) {
    utils.run_cmd('ls',['-la'],function(r) {
        callback(r);
    });
}



module.exports = router;