var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');
var gameDal = require('../model/game_dal');
var playerDal = require('../model/player_dal');


router.get('/all_games', function(req, res) {
    gameDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.render('api/endpoint.ejs', {rs: result});
    });
});

router.get('/all_courts', function(req, res) {
    courtDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.render('api/endpoint.ejs', {rs: result});
    });
});

router.get('/all_players', function(req, res) {
    playerDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.render('api/endpoint.ejs', {rs: result});
    });
});

module.exports = router;