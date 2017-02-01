var http = require('http');
var prdInst = require('./lib/product-instance');
var settings = require('./lib/settings')
var prodroutes = require('./Routes/prodRoutes')
var validation = require('./core/validation');


http.createServer(function(req, res){

validation.validate(req, res,function(message){
console.log("message : "+message);
});
        prdInst.getList(req, res);
}).listen(settings.webPort,function(){
    console.log('starting listing at 9000');
})