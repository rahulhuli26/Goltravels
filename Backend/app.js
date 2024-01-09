const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const facebookConfig = require("./controllers/controller.facebook");
const googleConfig = require("./controllers/controller.google");
const passport = require("passport");
const session = require("express-session");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

const adminAuthRouter = require("./routes/auth.admin");
const authRouter = require("./routes/auth.route");
const facebookRouter = require("./routes/auth.facebook");
const googleRouter = require("./routes/auth.google");

const app = express();
const port = process.env.PORT;

// Configure express-session and passport
app.use(
  require("express-session")({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/admin", adminAuthRouter);
app.use("/", facebookRouter);
app.use("/", googleRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, async () => {
  await db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL!");
    }
  });
  console.log(`Server is running on port ${port}`);
});
