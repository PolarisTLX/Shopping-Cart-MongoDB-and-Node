var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  //variable to flash success message if user makes transaction
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    //to create rows of 3 products: (break up all the products into an array which contains chunks of 3):
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    // res.render('index', { title: 'Express' });
    res.render('shop/index', { title: 'Shopping Cart with MongoDB and Node.js', products: productChunks, successMsg: successMsg, noMessages: !successMsg});

  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  //a new cart is recreated each time we add a new item:
  //var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  //we also pass the old cart to it:
  //req.session.cart, if it exists (true), pass it, if not, pass in empty {}

  //use mongoose to find the product from the id:
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    //if not error:
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

//route for the shopping-cart
router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  //check if shopping cart exists with items, otherwise no point being here?
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  //if there is a shopping cart:
  var cart = new Cart(req.session.cart);
  //the credit cart carge error messages to appear at the top of the page
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function(req, res, next) {
  //if there if no shopping cart with an item, redirect:
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  //re-create the cart:
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")(
    //stripe.com test secret/private key:
    "sk_test_GAkkE0pgYnVmYyzfURkChCkt"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken,
    description: "Test charge"
  }, function(err, charge) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('/checkout');
        }
        req.flash('success', 'Successfully brought product!');
        req.cart = null;
        res.redirect('/');
  });
});

module.exports = router;
