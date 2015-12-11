var express = require('express');
var router = express.Router();

var utils = require('..//helpers/utils');


router.get('/', function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'control-panel'});
});

router.get('/listDir', function(req, res){
    listDir(res); //list dir will send response
    //res.send('here');
});


function listDir(res) {
    utils.run_cmd('ls',['-la'],function(r) {
        res.send(r);
    });
}



module.exports = router;