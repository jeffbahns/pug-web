var express = require('express');
var router = express.Router();
var playerDal = require('../model/player_dal');

router.get('/', function(req, res) {
    playerDal.GetByID(req.query.PlayerID, function(err, result) {
        if(err) {
            throw err;
        }
        res.render('player/playerDisplayInfo.ejs', {rs: result, PlayerID: req.query.PlayerID});
    });
});

module.exports = router;