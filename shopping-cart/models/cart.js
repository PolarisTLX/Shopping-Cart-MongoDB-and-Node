//when recreating the cart, pass the old cart's items into it (oldCart)
module.exports = function Cart(oldCart) {
  //if these are undefined (because does not exists yet)
  //then pass in empty item or 0 for Qty and price
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //add items to cart function:
  this.add = function(item, id) {
    //storedItem will be true or false if it exists
    var storedItem = this.items[id];
    //if above doesnt work (item doesnt yet exist), create a new item:
    if (!storedItem) {
      //each item id will hold: name, qty, price
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    //if item already exists, skip step above, and increase the Qty of that item:
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  //function to transform cart items into an array (they are an object before this)
  this.generateArray = function() {
    var arr = [];
    for (id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
