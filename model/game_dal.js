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
    connection.query('SELECT *, COUNT(pig.PlayerID) as NumPlayers FROM game\n'
    + 'JOIN court ON court.courtID = game.CourtID\n'
    + 'JOIN player_in_game pig ON pig.GameID = game.GameID\n'
    + 'GROUP BY GameName;',
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

exports.GetAllWithCourtsAndPreferences = function(preferences, callback) {
    query = 'SELECT *, COUNT(pig.PlayerID) AS NumPlayers FROM game\n'
        +   'JOIN court ON court.CourtID = game.GameID\n'
        +   'JOIN player_in_game pig ON pig.GameID = game.GameID\n'
        +   'WHERE game.GameID IN    (SELECT game.GameID FROM game\n'
        +                       'WHERE SkillLevel = ?)\n'
        +   'GROUP BY GameName;';
    console.log(query, preferences.SkillLevel);
    connection.query(query, preferences.SkillLevel,
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

exports.GetByPlayerID = function(PlayerID, callback) {
    query = 'SELECT * FROM game\n'
    + 'JOIN player_in_game pig ON pig.GameID = game.GameID\n'
    + 'JOIN court ON court.CourtID = game.CourtID\n'
        + 'WHERE PlayerID = ' + PlayerID + ';';

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

exports.GetByCourtID = function(CourtID, callback) {
    query = 'SELECT * FROM game\n'
        + 'JOIN court ON court.CourtID = game.CourtID\n'
        + 'JOIN player ON player.PlayerID = game.CreatorID\n'
        + 'WHERE court.CourtID = ' + CourtID + ';';

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

exports.Insert = function(CreatorID, game_info, callback) {
    query = 'INSERT INTO game(GameDateTime, GameName, GameDuration, SkillLevel, CourtID, CreatorID) VALUES (' +
    '\'' + game_info.GameDateTime + '\', ' +
    '\'' + game_info.GameName + '\', ' +
    game_info.GameDuration + ', ' +
    '\'' + game_info.SkillLevel + '\', ' +
    game_info.CourtID + ', ' +
    CreatorID + ')';
    console.log(query);
    connection.query(query,
        function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
                return err;
            }
            console.log(result);
            query = 'INSERT INTO player_in_game(GameID, PlayerID) VALUES ('
            + result.insertId + ', '
            + CreatorID + ');';
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
        });
};

exports.Delete = function(game_info, callback) {
    query = 'DELETE FROM game WHERE GameID=' + game_info.GameID;
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

exports.LeaveGame = function(PlayerID, GameID, callback) {
    query = 'DELETE FROM player_in_game\n'
    + 'WHERE PlayerID = ? AND GameID = ?;';
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