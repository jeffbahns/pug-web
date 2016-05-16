var express = require('express');
var router = express.Router();
var gameDal = require('../model/game_dal');
var playerDal = require('../model/player_dal');
var courtDal = require('../model/court_dal');

router.get('/all', function(req, res) {
    gameDal.GetAllWithCourts(function(err, result) {
        if(err) {
            res.send(err);
        }
        gameDal.GetByPlayerID(req.session.account.PlayerID, function(err, result2) {
            if(err) {
                res.send(err);
            }
            load_user_and_render(req, res, 'game/gameDisplayAll.ejs', {rs: result, gr: result2});
        });
    });
});

router.get('/', function(req, res) {
    gameDal.GetByID(req.query.GameID, function(err, result) {
        if(err) {
            res.send(err);
        }
        playerDal.GetCreatorByGameID(req.query.GameID, function(err, creator_result) {
            if(err) {
                throw err;
            }
            load_user_and_render(req, res, 'game/gameDisplayInfo.ejs',
                {rs: result, cr: creator_result, GameID: req.query.GameID});
        });
    });
});

router.get('/search', function(req, res) {
    gameDal.GetAllWithCourtsAndPreferences(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        gameDal.GetByPlayerID(req.session.account.PlayerID, function(err, result2) {
            if(err) {
                res.send(err);
            }
            load_user_and_render(req, res, 'game/gameDisplayAll.ejs', {rs: result, gr: result2});
        });
    });
});

router.get('/create', function(req, res) {
    var data = {
        title: 'Express'
    };
    courtDal.GetAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        load_user_and_render(req, res, 'game/gameCreateForm.ejs', {rs: result});

    });
});

router.get('/save', function(req, res) {
    console.log(req.query);
    gameDal.Insert(req.session.account.PlayerID, req.query, function(err, result) {
        response = {};
        if(err) {
            response.error = err + "\nGame creation unsuccessful";
        }
        else {
            response.message = "Game successfully created, have fun!";
        }
        res.json(response);
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query);
    gameDal.Delete(req.query, function(err, result) {
        response = {};
        if(err) {
            response.message = "Game deletion unsuccessful";
        }
        else {
            response.message = "Game successfully deleted";
        }
        res.json(response);
    });
});

router.get('/join', function(req, res) {
    gameDal.JoinGame(req.session.account.PlayerID, req.query.GameID, function (err, result) {
        response = {};
        if (err) {
            response.error = err.message;
        }
        else {
            response.message = "Joined successfully";
        }
        res.json(response);
    });
});

router.get('/leave', function(req, res) {
    gameDal.LeaveGame(req.session.account.PlayerID, req.query.GameID, function(err, result) {
        response = {};
        if(err) {
            response.error = err.message;
        }
        else {
            response.message = "Left game successfully"
        }
        res.json(response);
    }) 
});

function load_user_and_render(req, res, shit_to_load, extra_shit) {
    var data = {
        title : 'Express'
    };
    extra_shit.data = data;
    if(req.session.account === undefined) {
        res.render(shit_to_load, {data: data});
    }

    else {
        data.first_name = req.session.account.FirstName;
        data.last_name = req.session.account.LastName;
        data.PlayerID = req.session.account.PlayerID;
        data.Username = req.session.account.Username;
        res.render(shit_to_load, extra_shit);
    }
}

module.exports = router;