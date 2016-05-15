var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');
var gameDal = require('../model/game_dal');

router.get('/all', function(req, res) {
   courtDal.GetAll(function(err, result) {
       if(err) {
           res.send(err);
       }
       load_user_and_render(req, res, 'court/courtDisplayAll.ejs', {rs: result});
   });
});

router.get('/', function(req, res) {
   courtDal.GetByID(req.query.CourtID, function(err, result) {
       if(err) {
           console.log(err);
       }
       gameDal.GetByCourtID(req.query.CourtID, function(err, result2) {
           if(err) {
               console.log(err);
           }
           load_user_and_render(req, res, 'court/courtDisplayInfo.ejs',
               {rs: result, CourtID: req.query.CourtID, gr: result2});
       });
   });
});

router.get('/create', function(req, res) {
    var data = {
        title: 'Express'
    };
    load_user_and_render(req, res, 'court/courtCreateForm.ejs', {});
});

router.get('/save', function(req, res) {
    console.log(req.query);
    courtDal.Insert(req.query, function(err, result) {
        response = {};
        if(err) {
            // response.message = err.message;
            response.message = "Court creation unsuccessful";
        }
        // else if (result == null) {
        //     response.message = "Game creation unsuccessful";
        // }
        else {
            response.message = "Court successfully created";
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
        data.PlayerID = req.session.account.PlayerID;
        data.Username = req.session.account.Username;
        res.render(shit_to_load, extra_shit);
    }
}

module.exports = router;