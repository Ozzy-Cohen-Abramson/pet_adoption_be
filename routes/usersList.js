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

// fetching the users

router.get("/get/users", (req, res) => {
  try {
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
