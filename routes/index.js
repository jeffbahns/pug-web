var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CS355', subtitle: 'Lab 8' });
});

/* GET template example */
router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs', {title: 'pug-web'})
});

router.get('/about', function(req, res, next) {
    res.render('about.ejs');
});

module.exports = router;
