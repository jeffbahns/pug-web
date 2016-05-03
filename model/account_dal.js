var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.GetByUsername = function(username, password, callback) {
    var query = 'CALL Account_GetByUsername(?, ?)';
    var query_data = [username, password];
    console.log(query, query_data);
    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        else if(result[0].length == 1) {
            /* NOTE: Stored Procedure results are wrapped in an extra array
             * and only one user record should be returned,
             * so return only the one result
             */
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
};

exports.InsertNewUser = function(Username, Password, FirstName, LastName, PhoneNumber, Age, callback) {
    var query = 'INSERT INTO player(Username, Password, FirstName, LastName, PhoneNumber, Age)' +
        'VALUES (?, ?, ?, ?, ?, ?)';
    var query_data = [Username, Password, FirstName, LastName, PhoneNumber, Age];
    console.log(query, query_data);
    connection.query(query, query_data, function(err, result) {
        if(err) {
            callback(err, null);
        }
        else {
            callback(false, result);
        }
    })
};