var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'CS355', subtitle: 'Lab 8' });
});

router.get('/about', function(req, res, next) {
    res.render('about.ejs');
});

router.get('/home', function(req, res, next) {
    res.render('index.ejs');
});

module.exports = router;
