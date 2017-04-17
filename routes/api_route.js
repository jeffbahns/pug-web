var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');
var gameDal = require('../model/game_dal');
var playerDal = require('../model/player_dal');


router.get('/', function(req, res) {
    gameDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.render('api/endpoint.ejs', {rs: result});
    });
    //res.render('api/endpoint.ejs');
});

router.get('/', function(req, res) {
    res.render('api/endpoint.ejs');
});

router.get('/', function(req, res) {
    res.render('api/endpoint.ejs');
});

module.exports = router;