var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');
var gameDal = require('../model/game_dal');
var playerDal = require('../model/player_dal');

router.get('/authenticate', function(req, res) {
    console.log(req.body);
    console.log(req.query);
    accountDal.GetByUsername(req.query.Username, req.query.Password, function(err, account) {
        result = [];
        response = {};
        if (account == null) {
            response.response = "fail";
        }
        else {
            response.response = "pass";
            response.user = account;
        }
        result.push(response["user"]);
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

router.get('/players_in_game', function(req, res) {
    playerDal.GetPlayersByGameID(req.query.GameID, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result[0]);
    })
});

router.get('/player_by_id', function(req, res) {
    playerDal.GetByID(req.query.PlayerID, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

router.get('/insert_user', function(req, res) {
    console.log(req.query);
    accountDal.InsertNewUser(req.query.Username, req.query.Password, req.query.FirstName,
        req.query.LastName, req.query.PhoneNumber, req.query.Age, function(err, result) {
            response = {};
            if (err) {
                response.error = err.message;
            }
            else {
                response.message = "You successfully signed up for Sixth Man";
            }
            res.json(response);
        });
});

router.get('/insert_court', function(req, res) {
    console.log(req.query);
    courtDal.Insert(req.query, function(err, result) {
        response = {};
        if(err) {
            response.message = "Court creation unsuccessful";
        } else {
            response.message = "Court successfully created";
        }
        res.json(response);
    });
});

router.get('/insert_game', function(req, res) {
    console.log(req.query);
    gameDal.Insert(req.query.CreatorID, req.query, function(err, result) {
        result = [];
        response = {};
        if(err) {
            response.error = err + "\nGame creation unsuccessful";
        }
        else {
            response.message = "Game successfully created, have fun!";
        }
        result.push(response);
        res.json(result);
    });
});


module.exports = router;