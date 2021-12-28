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

router.get("/adoptedby/:id", (req, res) => {
  try {
    const petId = req.params.id;
    const sqlSelect = SQL`SELECT * FROM pets WHERE pet_id=${petId};`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/adoptedby", (req, res) => {
  try {
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`UPDATE pets SET adopted_by=${userId} ,adoption_status="Adopted" WHERE pet_id=${petId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shalterpet", (req, res) => {
  try {
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`UPDATE pets SET fostered_by=null , adopted_by=null ,adoption_status="To adopt" WHERE pet_id=${petId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shalterpet", (req, res) => {
  console.log("wow");
  try {
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`UPDATE pets SET fostered_by=${userId} WHERE pet_id=${petId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
      console.log("fostered!");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
