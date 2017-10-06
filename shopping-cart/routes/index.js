var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    //to create rows of 3 products: (break up all the products into an array which contains chunks of 3):
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    // res.render('index', { title: 'Express' });
    res.render('shop/index', { title: 'Shopping Cart with MongoDB and Node.js', products: productChunks });

  });
});

module.exports = router;
