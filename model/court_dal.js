var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM court;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log("COURTS ____________________________");
            console.log(result);
            console.log("///COURTS_________________________)");
            callback(false, result);
        });
};

exports.GetByID = function(CourtID, callback) {
    query = 'SELECT * FROM court\n'
        + 'LEFT JOIN court_rating cr ON cr.CourtID = court.CourtID\n'
        + 'LEFT JOIN player ON player.PlayerID = cr.PlayerID\n'
        + 'WHERE court.CourtID = ' + CourtID + ';';
    connection.query(query,
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.GetRatingsByID = function(CourtID, callback) {
    query = 'SELECT * FROM court_rating WHERE CourtID = ' + CourtID + ';';
    connection.query(query,
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.Insert = function(court_info, callback) {
    query = 'INSERT INTO court(CourtName, Address, City, State, ZipCode) VALUES ('
        + '\'' + court_info.CourtName + '\', '
        + '\'' + court_info.Address + '\', '
        + '\'' + court_info.City + '\', '
        + '\'' + court_info.State + '\', '
        + '\'' + court_info.ZipCode + '\');';
    console.log(query);
    connection.query(query,
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true, err); // not sure if correct
                return;
            }
            console.log(result);
            callback(false, result);
        });
};