exports.init = function (app) {
    app.use('/', require('./control-panel')); //for root, use index handler

};