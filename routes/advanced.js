const { response } = require("express");
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

// fetching the pet list for search

let basicSearchInput;
let petsObject = {};

router.get("/advanced?:advancedInput", (req, res) => {
  try {
    petsObject = {};
    type = req.query.type || "%";
    input = req.query.input || "%";
    height = req.query.height || 1000;
    weight = req.query.weight || 1000;
    status = req.query.status || "%";
    const sqlSelect = `SELECT * FROM pets WHERE pet_type LIKE "${type}" AND adoption_status LIKE "${status}" AND pet_name LIKE "%${input}%" AND pet_height < ${height} AND pet_weight < ${weight};
    `;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      petsObject = {};
      result.forEach((pet) => {
        const { pet_id, ...rest } = pet;
        petsObject[pet.pet_id] = rest;
      });
      res.send(petsObject);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
