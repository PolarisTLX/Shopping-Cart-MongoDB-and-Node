var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//for Sign-Up
passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  //validate the email is a valid one with express-validator middleware:
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {message: 'That email is already in use.'});
    }
    var newUser = new User();
      newUser.email = email;
      // newUser.password = password;
      //this is replaced with encrypted one:
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result) {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      });

  });

}));

//for Sign-In
passport.use('local.signin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
    //validate the email is a valid one with express-validator middleware:
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user) {
      if (err) {
        return done(err);
      }
      //THIS IS REVERSE OF SIGN-UP:
      if (!user) {
        return done(null, false, {message: 'There is no user registered with that e-mail.'});
      }
      //THIS IS NEW FROM SIGN-UP:
      if(!user.validPassword(password)) {
        return done(null, false, {message: 'Password entered is incorrect'});
      }
      //this is simpler than Sign-Up:
      return done (null, user);
    });
}));
