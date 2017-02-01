var mysql = require('mysql')
var settings = require('../config/aws')

exports.executeSql = function (sql, callback) {
  var conn = mysql.createConnection(settings.dbConfig)
  conn.query(sql, function (error, results, fields) {
    if (error) {
      console.log('Erro while interacting with DB : ' + error)
      callback(null, error)
    } else {
      console.log('connected to DB')
      callback(results)
    }
  })
}

exports.executeBulkSql = function (sql, values, callback) {
  for (var i = 0;i < values.length;i++) {
    var conn = mysql.createConnection(settings.dbConfig)
    conn.query(sql, values[i], function (error, results, fields) {
      if (error) {
        console.log('Erro while interacting with DB : ' + error)
        callback(null, error)
      } else {
        //callback(results,error)
        console.log('connected to DB')        
      }
    })
  } 
  callback(null,null)
}
