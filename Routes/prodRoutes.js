var express = require('express')

var prdInst = require('../bean/ProductInstance')
var msgs = require('../core/httpMessages')
var validations = require('../core/validation')
var routes = function () {
  var prodRouter = express.Router()

  prodRouter.route('/Products')
    .post(function (req, res) {
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
    })
    .get(function (req, res) {
      /*  var responseJson = { hello: 'This is my API GET' }
  res.json(responseJson)*/
      prdInst.getList(req, res)
    })
  return prodRouter
}

module.exports = routes
