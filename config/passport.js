const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../model/schemas/user");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async (payload, done) => {
    // console.log(`payload`, payload)
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
