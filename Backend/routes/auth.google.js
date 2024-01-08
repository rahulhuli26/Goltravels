const { Router } = require("express");
const googleRouter = Router();
const db = require("../db");
const passport = require("passport");
const Window = require("window");

// Route for Google login
googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

// Callback URL for Google login
googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://goltravels.com",
    failureRedirect: "/",
  })
);

module.exports = googleRouter;
