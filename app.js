var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.set('masterPassword','10000:e1767d6836622fb75b780fc620a65f76b72533fe15ac0035202b080d650dd61e3d669e542bcc4f015c0886dc93a7c6450acfde94846de10316d8b204188aa0579a43191d636af8fe3a3e215c65bcb34c266c5c3c85e0f4ac4bb6100ade2b0060dd2fb3b351de7efa355f7fa7776f1ead2adbb0b1c843d3dea8c77fbfb75e2fa5:5acc2a7d2f1ba2a39686ab69c06902d3726bd481e4b0e2ce30e85c39ff7156ccc9781fe595c47d82bc85d4d46d0b83469c0d791494fdff4cab355db9ba0d0eb795dd2d7d350e72f1b86362f087b7838ab55d65e3abc5f1bcc4afe8866b8b50923dd755dbd9f17efc78d92fa391d3ab4ce2746fdeba148941f589387347f86b501368f67971223ffaa3472e3184f156aacea4d5388291d0c03a4ee5a9e71b1eb82671d938cb84398573afd48d81aefb6bc0e4980481ac4bd7b67adf015b749c9e0fe1fb18443bf6729d3038eec0f34042461733d79dc81ccd5086cdc4deaec78543b8764de6b82293e87b5e53edffcf3a1d3397dec1625dd637fda9f1414f1316');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Populates req.session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'idontknow'
}));

/*one file to set up routes*/
var routeHandler = require('./routes/_route-handler');
routeHandler.init(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
