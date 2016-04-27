var express = require('express');
var router = express.Router();
var gameDal = require('../model/game_dal');

router.get('/all', function(res, res) {
    gameDal.GetAllWithCourts(function(err, result) {
        if(err) {
            throw err;
        }
        res.render('game/gameDisplayAll.ejs', {rs: result});
    });
});

router.get('/', function(req, res) {
    gameDal.GetByID(req.query.GameID, function(err, result) {
        if(err) {
            throw err;
        }
        res.render('game/gameDisplayInfo.ejs', {rs: result, GameID: req.query.GameID});
    });
});

router.get('/create', function(req, res) {
   res.render('game/gameCreateForm.ejs');
});

router.get('/save', function(req, res) {
    console.log(req.query);
    gameDal.Insert(req.query, function(err, result) {
        if(err) {
            throw err;
        }
        res.send('Successfully saved');
    });
});

module.exports = router;