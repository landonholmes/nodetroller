var express = require('express');
var fs = require('fs');
var router = express.Router();

var headerData;
fs.readFile("./views/includes/header.html", function(err, data){
  if (err) return console.error(err);
  headerData = data;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', header: headerData });
});

module.exports = router;
