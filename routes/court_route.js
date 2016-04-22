var express = require('express');
var router = express.Router();
var courtDal = require('../model/court_dal');

router.get('/all', function(req, res) {
   courtDal.GetAll(function(err, result) {
       if(err) {
           throw err;
       }
       res.render('court/courtDisplayAll.ejs', {rs: result});
   });
});

router.get('/', function(req, res) {
   courtDal.GetByID(req.query.CourtID, function(err, result) {
       if(err) {
           throw err;
       }
       res.render('court/courtDisplayInfo.ejs', {rs: result, CourtID: req.query.CourtID});
   });
});

module.exports = router;