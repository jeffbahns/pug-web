var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM player;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.GetByID = function(PlayerID, callback) {
    query = 'SELECT * FROM player WHERE PlayerID = ' + PlayerID;
    console.log(query);
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

exports.GetCreatorByGameID = function(GameID, callback) {
    query = 'SELECT Username, FirstName, LastName, PlayerID FROM player\n'
        + 'JOIN game ON game.CreatorID = player.PlayerID\n'
        + 'WHERE game.GameID = ' + GameID + ';';
    console.log(query);
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

exports.JoinGame = function(PlayerID, GameID, callback) {
    query = 'INSERT INTO player_in_game(PlayerID, GameID) VALUES (?, ?)';
    query_data = [PlayerID, GameID];
    console.log(query, query_data);
    connection.query(query, query_data, function(err, result) {
        if(err) {
            console.log(err);
            callback(err, null);
        }
        else {
            callback(false, result);
        }
    });
};