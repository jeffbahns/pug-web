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
    connection.query('SELECT * FROM game JOIN court ON court.courtID = game.CourtID;',
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
    + 'LEFT JOIN court ON court.CourtID = game.CourtID\n'
    + 'LEFT JOIN player_in_game ON player_in_game.GameID = game.GameID\n'
    + 'LEFT JOIN player ON player.PlayerID = player_in_game.PlayerID\n'
    + 'WHERE game.GameID = ' + GameID + ';';
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

exports.Insert = function(game_info, callback) {
    query = 'INSERT INTO game(GameDateTime, GameName, GameDuration, SkillLevel, CourtID, CreatorID) VALUES (' +
    '\'' + game_info.GameDateTime + '\', ' +
    '\'' + game_info.GameName + '\', ' +
    game_info.GameDuration + ', ' +
    '\'' + game_info.SkillLevel + '\', ' +
    game_info.CourtID + ', ' +
    game_info.CreatorID + ')'; 
    console.log(query);
    connection.query(query,
        function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
                return err;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.JoinGame = function(GameID, PlayerID, callback) {
    query = 'INSERT INTO player_in_game(GameID, PlayerID) VALUES ('
    + GameID + ', '
    + PlayerID + ')';
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