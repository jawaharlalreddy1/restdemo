var validations = require('../../lib/validation')
var prdInst = require('../../lib/product-instance')
var catInst = require('../../lib/categories')
var instanceId
exports.postProducts = function (req, res) {
  var response = {
    error: []
  }
  validations.validate(req, response, function (errorArray) {
    if (errorArray.length <= 0) {
      prdInst.add(req, res, function (err) {
        if (!err) {        
        prdInst.get(req.body.ProductHeader.enterpriseItemId, function (data, id) {
          if (data == null) response.error.push('Error while executing DB operations')
          else {
            console.log('POST Request Instance ID  : ' + JSON.stringify(data[0].INSTANCE_ID))
            catInst.add(req, res, JSON.stringify(data[0].INSTANCE_ID))
          }
        })
      }}) // can be reduced by creating a global variable for instance id    

    } else {
      res.send(response)
    }
  })
}

exports.getProducts = function (req, res) {
  res.send('hello')
}

exports.putProducts = function (req, res) {
  console.log('PUt Request')

  prdInst.get(req.body.ProductHeader.enterpriseItemId, function (data) {
    if (data == null) response.error.push('Error while executing DB operations')
    else if (data.length == 0) {
      console.log('POST Request')
      res.status(500).send({ error: 'Invalid Request Type : Use POST' })
      res.end()
    }else {
      console.log('PUT Reqeust')
      prdInst.update(req, res)
      res.end()
    }
  })
}
