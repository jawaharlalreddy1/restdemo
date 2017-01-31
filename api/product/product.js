var validations = require('../../core/validation')
var prdInst = require('../../bean/ProductInstance')

exports.addProducts = function(req, res) {
    var response = {
        error: []
      }
      validations.validate(req, response)
      if (response.error.length <= 0) {
        //  prdInst.getList(req, res)
        prdInst.add(req, res)
      } else {
        res.send(response)
      }
}

exports.getProducts = function(req, res) {
        res.send('hello');
}