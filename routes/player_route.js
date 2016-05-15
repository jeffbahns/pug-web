var express = require('express');
var router = express.Router();
var playerDal = require('../model/player_dal');
var gameDal = require('../model/game_dal');

router.get('/', function(req, res) {
    playerDal.GetByID(req.query.PlayerID, function(err, result) {
        if(err) {
            res.send(err);
        }
        gameDal.GetByPlayerID(req.query.PlayerID, function(err, result2) {
            if(err) {
                res.send(err);
            }
            load_user_and_render(req, res, 'player/playerDisplayInfo.ejs',
                {rs: result, PlayerID: req.query.PlayerID, gr: result2});
        });
    });
});

router.get('/add_friend', function(req, res) {
    playerDal.AddFriend(req.session.account.PlayerID, req.query.PlayerID, function(err, result) {
        response = {};
        if (err) {
            response.message = err.message;
        }
        else if(result.length == 0){
            response.message = "You are already friends";
        }
        else {
            response.message = "New friend added";
        }
        res.json(response);
    });
});

router.get('/remove_friend', function(req, res) {
    playerDal.RemoveFriend(req.session.account.PlayerID, req.query.FriendID, function(err, result) {
        response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = "Friend successfully removed";
        }
        res.json(response);
    });
});

router.get('/friends', function(req, res) {
    playerDal.GetFriendsByID(req.session.account.PlayerID, function(err, result) {
        if(err) {
            res.send(err);
        }
        console.log(result[0]);
        load_user_and_render(req, res, 'player/playerDisplayFriends.ejs',
            {rs: result[0]});
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
        data.Username = req.session.account.Username;
        res.render(shit_to_load, extra_shit);
    }
}

module.exports = router;