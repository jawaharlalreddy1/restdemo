'use strict';

var express = require('express')

var prdInst = require('./bean/ProductInstance')
var msgs = require('./core/httpMessages')
var validations = require('./core/validation')

var productApi = require('./api/product');

var routes = function () {

  var prodRouter = express.Router()

  productApi(prodRouter);

  return prodRouter
}

module.exports = routes
