const { Router } = require("express");
const facebookRouter = Router();
const db = require("../db");
const passport = require("passport");

// Facebook authentication route
facebookRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook callback route
facebookRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a token
    res.redirect("https://goltravels.com");
  }
);

module.exports = facebookRouter;
