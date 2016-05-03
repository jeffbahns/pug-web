var express = require('express');
var router = express.Router();
var gameDal = require('../model/game_dal');

router.get('/all', function(req, res) {
    gameDal.GetAllWithCourts(function(err, result) {
        if(err) {
            throw err;
        }
        load_user_and_render(req, res, 'game/gameDisplayAll.ejs', {rs: result});
    });
});

router.get('/', function(req, res) {
    gameDal.GetByID(req.query.GameID, function(err, result) {
        if(err) {
            throw err;
        }
        load_user_and_render(req, res, 'game/gameDisplayInfo.ejs', {rs: result, GameID: req.query.GameID});
    });
});

router.get('/create', function(req, res) {
    var data = {
        title : 'Express'
    };
    load_user_and_render(req, res, 'game/gameCreateForm.ejs', {});
});

router.get('/save', function(req, res) {
    console.log(req.query);
    gameDal.Insert(req.query, function(err, result) {
        if(err) {
            throw err;
        }
        var data = {
            title : 'Express'
        };

        if(req.session.account === undefined) {
            res.send('Successfully saved');
        }

        else {
            data.first_name = req.session.account.first_name;
            data.last_name = req.session.account.last_name;
            res.send('Successfully saved');
        }
    });
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
        res.render(shit_to_load, extra_shit);
    }
}

module.exports = router;