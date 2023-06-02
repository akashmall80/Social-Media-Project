const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./envirnoment');

//passport to use a new strategy for ggogle login
passport.use(new googleStrategy({
        clientID: "675902497755-o2j5r98gk1hrvnfq3rtfnhkmtdjuphqn.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
        proxy: true
    },
    //profile is google information
    async function (accessToken, refreshToken, profile, done) {
        //find a user
        try {
            let userFind = await User.findOne({
                email: profile.emails[0].value
            })
            //if user found
            if (userFind) {
                return done(null, userFind);
            }
            //if not found create
            else {
               let createUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, createUser);
            }

        } catch (err) {
           console.log("error",err)
            return;
        }
    }
))

module.exports = passport;