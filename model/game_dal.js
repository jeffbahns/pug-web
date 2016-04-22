var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM game;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.GetAllWithCourts = function(callback) {
    connection.query('SELECT * FROM game JOIN court ON court.courtID = game.GameID;',
        function(err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.GetByID = function(GameID, callback) {
    query = 'SELECT * FROM game\n'
    + 'JOIN court ON court.CourtID = game.CourtID\n'
    + 'JOIN player_in_game ON player_in_game.GameID = game.GameID\n'
    + 'JOIN player ON player.PlayerID = player_in_game.PlayerID\n'
    + 'WHERE game.GameID = ' + GameID + ';';
    connection.query(query,
        function(err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};