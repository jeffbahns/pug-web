var express = require('express');
var router = express.Router();
var movieDal = require('../model/movie_dal');
var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    movieDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('movie/displayAllMovies.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    movieDal.GetByID(req.query.movie_id, function (err, result) {
            if (err) throw err;

            res.render('movie/displayMovieInfo.ejs', {rs: result, movie_id: req.query.movie_id});
        }
    );
});

router.get('/create', function (req, res, next) {
    genreDal.GetAll(function(err, result) {
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('movie/movieFormCreate.ejs', {genres: result});
        }
    });
});

router.get('/save', function (req, res, next) {
    console.log("movie Title: " + req.query.title);
    console.log("movie Tagline: " + req.query.tagline);

    movieDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the movie.");
        }
    });
});

module.exports = router;