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
        if(err) {
            res.send(err);
        }
        if (err) {
            response.error = err.message;
        }
        else if (account == null) {
            response.error = "Account not found";
        }
        else {
            req.session.account = account;
            response.message = "Logged in successfully";
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

module.exports = router;