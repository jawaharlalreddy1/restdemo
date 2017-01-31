var mysql = require('mysql');
var settings = require('../core/settings');

exports.executeSql = function (sql, callback) {
  var conn = mysql.createConnection(settings.dbConfig);
  conn.query(sql, function (error, results, fields) {
    if (error) {
      console.log("Erro while interacting with DB : " + error);
      callback(null, error);
    } else {
      console.log("connected to DB");
      callback(results);
    }
  });
};