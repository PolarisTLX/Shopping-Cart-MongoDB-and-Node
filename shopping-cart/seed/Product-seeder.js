/*NOTE!!!  When chanages are made here, must run this file again in CP to update the database in MongoDB!:
//in CP go to   cd  C:\Users\Admin\Documents\GitHub\Shopping-Cart-MongoDB-and-Node\shopping-cart\seed
//then type "  node Product-seeder.js   "
//now if you check in the mongo  CD  window   db.products.find().pretty(), the chages should be reflected.
*/

//to remove a whole collection (all documents/tables in a collection):
//in CP mongo window type:    db.products.remove({})

var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
  new Product({
    imagePath: 'https://qph.ec.quoracdn.net/main-qimg-4db42aa418a10adeb1aec2f0a2393303-c',
    title: 'i9 Laptops with SSD',
    description: 'The best laptops on the market!',
    price: 999
  }),
  new Product({
    imagePath: 'http://i.dell.com/das/dih.ashx/232w/das/xa_____/global-site-design%20WEB/c86a25d0-86b2-cb69-e033-925c919668b9/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/Composite_Franchise_Imagery/laptop-latitude-franchise-composite-500-v3.jpg',
    title: 'i7 Laptops with SSD',
    description: 'Gaming Performance Laptops',
    price: 849
  }),
  new Product({
    imagePath: 'http://i.dell.com/das/dih.ashx/232w/das/xa_____/global-site-design%20WEB/c86a25d0-86b2-cb69-e033-925c919668b9/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/Composite_Franchise_Imagery/laptop-latitude-franchise-composite-500-v3.jpg',
    title: 'i5 Laptops with SSD',
    description: 'Mainstream Laptop with SSD',
    price: 749
  }),
  new Product({
    imagePath: 'http://i.dell.com/das/dih.ashx/232w/das/xa_____/global-site-design%20WEB/c86a25d0-86b2-cb69-e033-925c919668b9/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/Composite_Franchise_Imagery/laptop-latitude-franchise-composite-500-v3.jpg',
    title: 'i5 Laptops',
    description: 'Mainstream Laptops',
    price: 549
  }),
  new Product({
    imagePath: 'http://i.dell.com/das/dih.ashx/232w/das/xa_____/global-site-design%20WEB/c86a25d0-86b2-cb69-e033-925c919668b9/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/Composite_Franchise_Imagery/laptop-latitude-franchise-composite-500-v3.jpg',
    title: 'i3 Laptops',
    description: 'Value Laptops',
    price: 449
  }),
  new Product({
    imagePath: 'http://i.dell.com/das/dih.ashx/232w/das/xa_____/global-site-design%20WEB/c86a25d0-86b2-cb69-e033-925c919668b9/1/OriginalPng?id=Dell/Product_Images/Dell_Client_Products/Notebooks/Composite_Franchise_Imagery/laptop-latitude-franchise-composite-500-v3.jpg',
    title: 'Netbooks',
    description: 'Entry Level Netbook Laptops',
    price: 399
  })
];

var done = 0;

//to stope the products into the MongoDB database:
for (var i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {   //.save() is a handy mongoose built in function
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
