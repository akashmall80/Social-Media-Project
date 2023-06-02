const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback : true
}, async function (req,email, password, done) {
    try {
        let findUser = await User.findOne({
            email: email
        });
        if (!findUser || findUser.password != password) {
            console.log('invalid username/password');
            req.flash('error','invalid username/password');
            return done(null, false);
        }
        return done(null, findUser);
    } catch (err) {
        req.flash('error',err);
        return done(err);
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(async function (id, done) {
    try {
        let userFind = await User.findById(id);
        return done(null, userFind);
    } catch (err) {
        return done(err);
    }
})

//check user is authenticated or not

passport.checkAuthentication = function(req,res,next){
    //check authentication
  if(req.isAuthenticated()){
    return next();
  }

  //if user is not authenticated
  return res.redirect('/users/sign-in');
}


//send user sing in information to res.local.user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;