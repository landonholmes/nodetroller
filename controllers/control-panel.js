var express = require('express');
var router = express.Router();

var utils = require('..//helpers/utils');
var pass = require('..//helpers/pass');


router.get('/', function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'control-panel'});
});

router.get('/listDir', function(req, res){
    utils.run_cmd('ls',['-la'],function(r) {
        res.send(r);
    });
});

router.get('/restartMinecraftServer', function(req, res){
    utils.run_cmd('systemctl',['restart','minecraftserver'],function(r) {
        res.send(r);
    });
});

router.get('/statusMinecraftServer', function(req, res){
    utils.run_cmd('systemctl',['status','minecraftserver'],function(r) {
        res.send(r);
    });
});




module.exports = router;