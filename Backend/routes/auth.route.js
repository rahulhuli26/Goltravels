const { Router } = require("express");
const authRouter = Router();
const db = require("../db");

authRouter.post("/signup", (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  // Insert user into the database
  if (password === confirm_password) {
    const sql =
      "INSERT INTO usersignup (username, email, password, confirm_password) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [username, email, password, confirm_password],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("User registered successfully:", result);
          res.status(201).json({ message: "User registered successfully" });
        }
      }
    );
  } else {
    res
      .status(500)
      .json({ error: "password and confirm password should be same" });
  }
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const query = "SELECT * FROM usersignup WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length > 0) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

authRouter.post("/upload", (req, res) => {
  const {
    images,
    heading,
    hotel_stars,
    google_review,
    text,
    description,
    package_includes,
    strickedout_price,
    offer_percentage,
    offer_price,
  } = req.body;

  // Insert data into the MySQL database
  const sql =
    "INSERT INTO hotel_info (images, heading, hotel_stars, google_review, text, description, package_includes,strickedout_price, offer_percentage, offer_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    images,
    heading,
    hotel_stars,
    google_review,
    text,
    description,
    package_includes,
    strickedout_price,
    offer_percentage,
    offer_price,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data inserted into database");
      res.status(200).json({ message: "Data inserted into database" });
    }
  });
});

module.exports = authRouter;
