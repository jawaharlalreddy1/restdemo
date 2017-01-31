var controller = require('./product');

module.exports = function(router){
    router.post('/products', controller.addProducts);
    router.get('/products', controller.getProducts);
}