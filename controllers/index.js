var express = require('express');
var utils = require('..//helpers/utils');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'index'});
});

router.get('/listDir', function(req, res){
    res.send("found the page");
    listDir();
});


function listDir() {
    utils.run_cmd('ls',['-la'],function(response) {console.log(response);});
}



module.exports = router;