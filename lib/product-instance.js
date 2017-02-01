var db = require('../lib/db')
var msgs = require('../lib/httpMessages')
var util = require('util')
var mysql = require('mysql');
exports.getList = function (req, res) {
  db.executeSql('select * from PRODUCT_INSTANCE', function (data, err) {
    if (err)
      res.status(500).send({ error: 'Error while executeSql' })
    else
      msgs.sendJson(req, res, data)
  })
}

exports.get = function (id, callback) {
  console.log('Validating given Enterprise ID ' + id)
  db.executeSql('select INSTANCE_ID from PRODUCT_INSTANCE where ITEM_ID = ' + mysql.escape(id), function (data, err) {
    if (err) callback(null, null);
    else {
      if (data.length != 0) {
        console.log("Product instance get " + JSON.stringify(data[0].INSTANCE_ID));
        callback(data, JSON.stringify(data[0].INSTANCE_ID))
      } else {
        callback(data, null)
      }
    }
  })
}

exports.add = function (req, res,callback) {
  console.log("Adding Data into DB . . .")
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  today = mm + '/' + dd + '/' + yyyy;
  try {
    if (!req.body) throw new Error('Input not valid')
    if (req.body) {
      var sql = "INSERT INTO PRODUCT_INSTANCE(BUSINESS_DESR, STARTDATE, WEBSITE_URL, BUSINESS_PHONE, STATUS, ITEM_ID, ROW_ADDED_ID, ROW_ADDED_DTTM, ROW_LASTMANT_ID, ROW_LASTMANT_DTTM) VALUES('" + req.body.Content.BusinessDescription + "','" + req.body.Content.StartDate + "','" + req.body.Content.DestinationURL + "','" + req.body.Content.PhoneNumber + "','NEW','" + req.body.ProductHeader.enterpriseItemId + "','CA','" + today + "','CA','" + today + "')"
      db.executeSql(sql, function (data, err) {
        console.timeEnd('dbWriteTime')
        if (err)
          res.status(500).send({ error: 'Error while executeSql' })
        else
          callback(null);//res.status(200).send({ 'Success': 'true' })
      })
    } else throw new Error('Input not valid')
  } catch (ex) {
    res.status(500).send({ error: 'Exception while connecting DB' + ex })
  }
};


exports.update = function (req, res) {
  try {
    if (!req.body) throw new Error('Input not valid')
    if (req.body) {
      if (!req.body.ProductHeader.enterpriseItemId) throw Error('Enterprise Id not provided');

      var sql = 'UPDATE PRODUCT_INSTANCE SET ';
      var isDataProvided = false;

      if (req.body.Content.BusinessDescription) {
        sql += ' BUSINESS_DESR = ' + mysql.escape(req.body.Content.BusinessDescription);
        isDataProvided = true;
      }

      if (req.body.Content.PhoneNumber) {
        sql += ', BUSINESS_PHONE = ' + mysql.escape(req.body.Content.PhoneNumber);
        isDataProvided = true;
      }

      if (req.body.Content.StartDate) {
        sql += ' , STARTDATE = ' + mysql.escape(req.body.Content.StartDate);
        isDataProvided = true;
      }

      if (req.body.Content.DestinationURL) {
        sql += ' ,  WEBSITE_URL = ' + mysql.escape(req.body.Content.DestinationURL);
        isDataProvided = true;
      }
      //sql += ' ,  STATUS = ' + mysql.escape('UPDATE');
      if (isDataProvided) {
        sql += ' WHERE ITEM_ID = ' + mysql.escape(req.body.ProductHeader.enterpriseItemId);
        console.log('update....' + sql)
        db.executeSql(sql, function (data, err) {
          if (err)
            res.status(500).send({ error: 'Error while executeSql' })
          else {
            res.status(200).send({ 'Success': 'true' })
            res.end();
          }
        })
      }
    } else throw new Error('Input not valid')
  } catch (ex) {
    res.status(500).send({ error: 'Exception while connecting DB' + ex })
  }
};
