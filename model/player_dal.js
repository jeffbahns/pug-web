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

exports.GetFriendsByID = function(PlayerID, callback) {
    query = 'CALL Friends_GetByPlayerID(?);';
    console.log(query, PlayerID);
    connection.query(query, PlayerID,
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

exports.AddFriend = function(PlayerID, NewFriendID, callback) {
    query = 'INSERT INTO friends(FriendID1, FriendID2) VALUES\n'
    + '(' + PlayerID + ', '
    + NewFriendID + ');';
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

exports.RemoveFriend = function(PlayerID, RemovedFriendID, callback) {
    query = 'REMOVE FROM friends\n'
    + 'WHERE\n'
    + '(FriendID1 = ' + PlayerID + ' AND FriendID2 = ' + RemovedFriendID + ')\n'
    + 'OR\n'
    + '(FriendID1 = ' + RemovedFriendID + ' AND FriendID2 = ' + PlayerID + ');'

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
