var db = require('./db')
var mysql = require('mysql')
exports.add = function (req, res, instanceID) {
  console.log('Adding Data into DB . . .')
  try {
    if (!req.body) throw new Error('Input not valid')
    if (req.body) {
      var categories = req.body.Content.CategoryList
      console.log('categories in category.js file ' + categories[0].CategoryId)
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1; // January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      today = mm + '/' + dd + '/' + yyyy
      var sql = 'INSERT INTO PRODUCT_CATEGORIES(INSTANCE_ID, CATEGORY_ID, CATEGORY_DESC, ROW_ADDED_ID, ROW_ADDED_DTTM, ROW_LASTMANT_ID, ROW_LASTMANT_DTTM) VALUES (?,?,?,?,?,?,?)'
      var values = [ ]
        for (var i = 0; i < categories.length; i++) {
          var temp = [ ]
            temp[0] = instanceID
            temp[1] = categories[i].CategoryId
            temp[2] = categories[i].CategoryName
            temp[3] = 'CA'
            temp[4] = today
            temp[5] = 'CA'
            temp[6] = today
            values[i] = temp
          }
          db.executeBulkSql(sql, values, function (data, err) {
            if (err)
              res.status(500).send({ error: 'Error while executeSql' })
            else
              res.status(200).send({ 'Success': 'true' })
          })
        } else throw new Error('Input not valid')
      } catch (ex) {
        console.log('excpetion ' + ex); // res.status(500).send({ error: 'Exception while connecting DB' + ex })
      }
    }
