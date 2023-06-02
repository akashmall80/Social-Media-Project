const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
        try {
            let user = await User.findById(jwtPayload._id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            console.log('error in finding error from jwt');
            return;
        }
    }

))

module.exports = passport;