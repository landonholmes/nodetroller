var express = require('express');
var router = express.Router();

var utils = require('..//helpers/utils');
var pass = require('..//helpers/pass');
var crypto = require('crypto');



router.get('/login', function(req, res, next) {
    var messageType = req.session.messageType || ""; //see if there is anything in session
    var message = req.session.message || "";
    req.session.messageType = ""; //clear out session variables
    req.session.message = "";
    res.render('_includes/default-layout', { title: 'Login', page: 'login',messageType:messageType,message:message});
});

router.post('/loginSubmit', function(req, res, next) {
    if (!req.body.password) { //make sure they gave us a password
        res.send('Password is required.');
        return;
    }

    pass.validatePassword(req.body.password,req.app.get('masterPassword'),function(result){ //try to validate their attempt
        if (result==true) {
            req.session.loggedIn = true;
            res.redirect('/')
        } else {
            req.session.loggedIn = false;
            req.session.messageType = "danger";
            req.session.message = "Bad login. Try again.";
            res.redirect('/login');
        }
    });
    //res.send('Authorizing...');
});
router.get('/loginSubmit', function(req, res, next) {res.redirect('/login');}); //don't allow get methods to loginSubmit
router.get('/logout', function(req, res, next) {
    req.session.loggedIn = false; //clear session
    req.session.messageType = "success";
    req.session.message = "You have successfully logged out.";
    res.redirect('/login');
});

router.get('/',restrict, function(req, res, next) {
    res.render('_includes/default-layout', { title: 'Nodetroller', page: 'control-panel/control-panel'});
});

router.get('/listDir',restrict, function(req, res){
    utils.run_cmd('ls',['-la'],function(r) {
        res.send(r);
    },function(r){res.send(r)});
});

router.get('/restartMinecraftServer',restrict, function(req, res){
    utils.run_cmd('sudo systemctl',['restart','minecraftserver'],function(r) {
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
        res.redirect('/login');
    }
}



module.exports = router;