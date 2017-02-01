'use strict';

var express = require('express')

var prdInst = require('./lib/product-instance')
var msgs = require('./lib/httpMessages')
var validations = require('./lib/validation')
var productApi = require('./api/product');

var routes = function () {
var prodRouter = express.Router()
  productApi(prodRouter);
  return prodRouter
}

module.exports = routes
