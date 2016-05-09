var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');

router.get('/all', function(req, res) {
   courtDal.GetAll(function(err, result) {
       if(err) {
           throw err;
       }
       load_user_and_render(req, res, 'court/courtDisplayAll.ejs', {rs: result});
   });
});

router.get('/', function(req, res) {
   courtDal.GetByID(req.query.CourtID, function(err, result) {
       if(err) {
           throw err;
       }
       load_user_and_render(req, res, 'court/courtDisplayInfo.ejs', {rs: result, CourtID: req.query.CourtID});
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