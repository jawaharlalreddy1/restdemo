var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
var connection = require('express-myconnection')

var port = process.env.port || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

prodRouter = require('./Routes/prodRoutes')()
app.use('/rest', prodRouter)

app.get('/', function (req, res) {
  res.send('Welcome to my api')
})

app.listen(port, function () {
  console.log('gulp is running on my port :' + port)
})
