var express = require('express');
var router = express.Router();
var playerDal = require('../model/player_dal');

router.get('/', function(req, res) {
    playerDal.GetByID(req.query.PlayerID, function(err, result) {
        if(err) {
            throw err;
        }
        load_user_and_render(req, res, 'player/playerDisplayInfo.ejs', {rs: result, PlayerID: req.query.PlayerID});
    });
});

router.get('/join', function(req, res) {
    playerDal.JoinGame(req.query.PlayerID, req.query.GameID, function(err, result) {
        response = {};
        if (err) {
            response.message = err.message;
        }
        else {
            response.message = "You have joined";
        }
        res.json(response);
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
        res.render(shit_to_load, extra_shit);
    }
}

module.exports = router;