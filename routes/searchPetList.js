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

router.post("/search", (req, res) => {
  try {
    petsObject = {};
    basicSearchInput = req.params.searchinput;
    const sqlSelect = `SELECT * FROM pets WHERE pet_name LIKE "%${basicSearchInput}%";`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/search/:searchinput", (req, res) => {
  try {
    basicSearchInput = req.params.searchinput;
    if (basicSearchInput) {
      const sqlSelect = `SELECT * FROM pets WHERE pet_name LIKE "%${basicSearchInput}%" OR pet_type LIKE "%${basicSearchInput}%";`;
      db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        petsObject = {};
        result.forEach((pet) => {
          const { pet_id, ...rest } = pet;
          petsObject[pet.pet_id] = rest;
        });
        res.send(petsObject);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
