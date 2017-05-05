var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');
var gameDal = require('../model/game_dal');
var playerDal = require('../model/player_dal');

router.get('/authenticate', function(req, res) {
    console.log(req.body);
    console.log(req.query);
    accountDal.GetByUsername(req.query.Username, req.query.Password, function(err, account) {
        result = []
        response = {};
        if (account == null) {
            response.response = "fail";
        }
        else {
            response.response = "pass";
            response.user = account;
        }
        result.push(response);
        res.json(result);
    });
});

router.get('/all_games', function(req, res) {
    gameDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.json(result);
    });
});

router.get('/all_courts', function(req, res) {
    courtDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.json(result);
    });
});

router.get('/all_players', function(req, res) {
    playerDal.GetAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        res.json(result);
    });
});

router.get('/courts', function(req, res) {
    courtDal.GetAllWithinRadius(req.query.origin_lat, req.query.origin_long, req.query.radius, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result[0]);
    });
});

router.get('/games_in_court', function(req, res) {
    gameDal.GetByCourtID(req.query.CourtID, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    })
});


module.exports = router;