const { response } = require("express");
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

router.get("/likedpet/:id", (req, res) => {
  try {
    const userId = req.params.userId;
    const sqlSelect = SQL`SELECT * FROM pets INNER JOIN liked_pet ON pets.pet_id=liked_pet.pet_id WHERE user_id = ${userId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/likepet", (req, res) => {
  try {
    petsObject = {};
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`INSERT INTO liked_pet (pet_id, user_id) VALUES (${petId}, ${userId});`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/dislikepet", (req, res) => {
  try {
    petsObject = {};
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`DELETE FROM liked_pet WHERE pet_id = ${petId} AND user_id = ${userId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
