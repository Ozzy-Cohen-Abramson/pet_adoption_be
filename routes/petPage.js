const { response } = require("express");
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
let petObj = {};

router.get("/pet/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sqlSelect = `SELECT * FROM pets WHERE pet_id LIKE "${id}";`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      petObj = {};
      result.forEach((pet) => {
        const { pet_id, ...rest } = pet;
        petObj[pet.pet_id] = rest;
      });
      if (petObj[id]) {
        res.send(petObj);
      } else res.send("No pet found!");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
