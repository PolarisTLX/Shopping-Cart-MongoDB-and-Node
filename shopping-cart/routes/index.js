var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

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


//error possibly in section below: (video "#15 or #16")
//they are 19min and 15min videos
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
        //creating order to be saved to database to have shipping addres
        //and keep track of a user's order history:
        var order = new Order({
          user: req.user,
          cart: cart,
          address: req.body.address,
          name: req.body.name,
          paymentId: charge.id
          //req.body is where express stroes the values sent with a POST request
        });
        order.save(function(err, result) {
          //need to implement an if for the err situations (even if rare)
          req.flash('success', 'Successfully brought product!');
          req.session.cart = null;
          res.redirect('/');
        });
  });
});

module.exports = router;
