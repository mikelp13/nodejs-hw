const passport = require("passport");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Forbidden",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
module.exports = guard;
