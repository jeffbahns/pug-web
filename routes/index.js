var express = require('express');
var router = express.Router();
accountDal = require('../model/account_dal');

router.get('/', function(req, res, next) {
    load_user_and_render(req, res, 'index.ejs');
});

router.get('/about', function(req, res, next) {
    load_user_and_render(req, res, 'about.ejs');

});

router.get('/login', function(req, res) {
    load_user_and_render(req,res, 'authentication/login.ejs');
});

router.get('/authenticate', function(req, res) {
    console.log(req.body);
    console.log(req.query);
    accountDal.GetByUsername(req.query.Username, req.query.Password, function(err, account) {
        response = {};
        if (err) {
            response.error = err.message;
        }
        else if (account == null) {
            response.error = "Account not found";
        }
        else {
            req.session.account = account;
            response.message = "Logged in successfully";
        }
        res.json(response);
    });
});
router.get('/logout', function(req, res) {
    req.session.destroy( function(err) {
        var data = {
            title : 'Express'
        };
        res.render('authentication/logout.ejs', {data: data});
    });
});

router.get('/signup', function(req, res) {
    load_user_and_render(req, res, 'authentication/signup.ejs');
});
router.get('/save', function(req, res) {
    console.log(req.query);
    accountDal.InsertNewUser(req.query.Username, req.query.Password, req.query.FirstName,
    req.query.LastName, req.query.PhoneNumber, req.query.Age, function(err, result) {
            response = {};
            if (err) {
                response.error = err.message;
            }
            else {
                response.message = "You successfully signed up for Sixth Man";
            }
            res.json(response);
        });
});

function load_user_and_render(req, res, shit_to_load) {
    var data = {
        title : 'Express'
    };
    if(req.session.account === undefined) {
        res.render(shit_to_load, {data: data});
    }

    else {
        data.first_name = req.session.account.FirstName;
        data.last_name = req.session.account.LastName;
        data.PlayerID = req.session.account.PlayerID;
        data.Username = req.session.account.Username;
        res.render(shit_to_load, {data: data});
    }
}

module.exports = router;
