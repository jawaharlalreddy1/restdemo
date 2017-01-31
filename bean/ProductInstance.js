var db = require('../dao/db')
var msgs = require('../core/httpMessages')
var util = require('util')
exports.getList = function (req, res) {
  db.executeSql('select * from PRODUCT_INSTANCE', function (data, err) {
    if (err)
      res.status(500).send({ error: 'Error while executeSql' })
    else
      msgs.sendJson(req, res, data)
  })
}

exports.get = function (req, res, id) {
  db.executeSql('select * from PRODUCT_INSTANCE where INSTANCE_ID ' + id, function (data, err) {
    if (err)
      res.status(500).send({ error: 'Error while executeSql' })
    else
      msgs.sendJson(req, res, data)
  })
}

exports.add = function (req, res) {
  console.log(req.body.Content.BusinessDescription)
  try {
    if (!req.body) throw new Error('Input not valid')
    if (req.body) {
      var sql = "INSERT INTO PRODUCT_INSTANCE(BUSINESS_DESR,WEBSITE_URL,BUSINESS_PHONE,STATUS) VALUES('" + req.body.Content.BusinessDescription + "','" + req.body.Content.DestinationURL + "','" + req.body.Content.PhoneNumber + "','NEW')"
      db.executeSql(sql, function (data, err) {
        console.timeEnd('dbWriteTime')
        if (err)
          res.status(500).send({ error: 'Error while executeSql' })
        else
          res.status(200).send({ data: 'Success'})
      })
    }else throw new Error('Input not valid')
  } catch(ex) {
    res.status(500).send({ error: 'Exception while connecting DB' + ex })
  }
}
