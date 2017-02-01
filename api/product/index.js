var prdController = require('./product');

module.exports = function(router){
    router.post('/products', prdController.postProducts);
    router.get ('/products', prdController.getProducts);
    router.put ('/products', prdController.putProducts);    
}