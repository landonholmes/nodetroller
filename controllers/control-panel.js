var express = require('express');
var router = express.Router();

var utils = require('..//helpers/utils');
var pass = require('..//helpers/pass');
var crypto = require('crypto');



router.get('/login', function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Login', page: 'login',message:''});
});

router.post('/loginSubmit', function(req, res, next) {
    if (!req.body.password) { //make sure they gave us a password
        res.send('Password is required.');
        return;
    }

    pass.validatePassword(req.body.password,req.app.get('masterPassword'),function(result){ //try to validate their attempt
        console.log('valdiation:',result);
        if (result==true) {
            req.session.loggedIn = true;
            res.redirect('/')
        } else {
            req.session.loggedIn = false;
            res.redirect('/login');
        }
    });
    //res.send('Authorizing...');
});
router.get('/loginSubmit', function(req, res, next) {res.redirect('/login');}); //don't allow get methods to loginSubmit

router.get('/',restrict, function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'control-panel/control-panel'});
});

router.get('/listDir',restrict, function(req, res){
    utils.run_cmd('ls',['-la'],function(r) {
        res.send(r);
    },function(r){res.send(r)});
});

router.get('/restartMinecraftServer',restrict, function(req, res){
    utils.run_cmd('systemctl',['restart','minecraftserver'],function(r) {
        res.send(r);
    },function(r){res.send(r)});
});

router.get('/getStatusMinecraftServer',restrict, function(req, res){
    utils.run_cmd('systemctl',['status','minecraftserver'],function(r) {
        res.send(r);
    },function(r){res.send(r)});
});


function restrict(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}



module.exports = router;