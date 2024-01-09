const { Router } = require("express");
const adminAuthRouter = Router();
const db = require("../db");

adminAuthRouter.post("/upload", (req, res) => {
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

adminAuthRouter.get("/getHotels", (req, res) => {
  const selectQuery = "SELECT * FROM hotel_info";

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.status(200).json(result);
  });
});

// ... (previous code)

// API endpoint to update hotel data by ID
adminAuthRouter.put("/getHotels/:id", (req, res) => {
  const hotelId = req.params.id;
  console.log(hotelId);
  const updatedHotelData = req.body; // Assuming the client sends updated data in the request body

  // Update the hotel data in the database
  const updateQuery = "UPDATE hotel_info SET ? WHERE id = ?";

  db.query(updateQuery, [updatedHotelData, hotelId], (err, result) => {
    if (err) {
      console.error("Error updating hotel:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Hotel not found");
    } else {
      res.status(200).json({ message: "Hotel updated successfully!" });
    }
  });
});

adminAuthRouter.get("/getHotels/:id", (req, res) => {
  const hotelId = req.params.id;
  const selectQuery = "SELECT * FROM hotel_info WHERE id = ?";

  db.query(selectQuery, [hotelId], (err, result) => {
    if (err) {
      console.error("Error fetching hotel:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("Hotel not found");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// API endpoint to delete a hotel by ID
adminAuthRouter.delete("/deleteHotels/:id", (req, res) => {
  const hotelId = req.params.id;
  const deleteQuery = "DELETE FROM hotel_info WHERE id = ?";

  db.query(deleteQuery, [hotelId], (err, result) => {
    if (err) {
      console.error("Error deleting hotel:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Hotel not found");
    } else {
      res.status(200).json({ message: "Hotel deleted successfully!" });
    }
  });
});

// ... (remaining code)

module.exports = adminAuthRouter;
