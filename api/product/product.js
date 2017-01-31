var validations = require('../../core/validation')
var prdInst = require('../../bean/ProductInstance')

exports.addProducts = function (req, res) {
  var response = {
    error: []
  }
  validations.validate(req, response, function (errorArray) {
    if (errorArray.length <= 0) {
      prdInst.add(req, res)
    }else {
      res.send(response)
    }
  })
}



exports.getProducts = function (req, res) {
  res.send('hello')
}
