const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const SQL = require("@nearform/sql");
const dotenv = require("dotenv").config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DB,
});

let petObj = {};

router.get("/AFpets/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const sqlSelect = SQL`SELECT * FROM pets WHERE adopted_by = ${userId} OR fostered_by = ${userId};`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      petObj = {};
      result.forEach((user) => {
        const { pet_id, ...rest } = user;
        petObj[user.pet_id] = rest;
      });
      if (petObj) {
        res.send(petObj);
      } else res.send("You have no pets yet!");
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/mypets/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const sqlSelect = SQL`SELECT * FROM pets INNER JOIN liked_pet ON pets.pet_id=liked_pet.pet_id WHERE user_id = ${userId};`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      petObj = {};
      result.forEach((user) => {
        const { pet_id, ...rest } = user;
        petObj[user.pet_id] = rest;
      });
      if (petObj) {
        res.send(petObj);
      } else res.send("You have no pets yet!");
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/mypetslike/:id", (req, res) => {
  try {
    const petId = req.params.id;
    const sqlSelect = SQL`SELECT * FROM liked_pet WHERE pet_id=${petId} ;`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
