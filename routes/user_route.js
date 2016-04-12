var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

router.get('/all', function(req, res) {
    userDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('user/displayAllUsers.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    userDal.GetByID(req.query.user_id, function (err, result) {
            if (err) throw err;

            res.render('user/displayUserRatings.ejs', {rs: result, user_id: req.query.user_id});
        }
    );
});

router.get('/create', function(req, res, next) {
    res.render('user/userFormCreate.ejs');
});

router.get('/save', function(req, res, next) {
    console.log("firstname equals: " + req.query.firstname);
    console.log("the lastname submitted was: " + req.query.lastname);
    console.log("email: " + req.query.email);
    console.log("password: " + req.query.password);
    //res.send("Successfully received the request.");

    userDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the user.");
        }
    });
});

module.exports = router;