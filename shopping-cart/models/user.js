var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//to encrypt a user's password:
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, rquired: true},
  password: {type: String, rquired: true}
});


//2 helper methods to encrypt a users password + check is password is valid/matches
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
