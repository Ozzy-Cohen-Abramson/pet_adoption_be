const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv").config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DB,
});

router.get("/get/pets", (req, res) => {
  try {
    const sqlSelect = "SELECT * FROM pets";
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
