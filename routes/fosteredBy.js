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

router.post("/fosteredby", (req, res) => {
  try {
    const petId = req.body.petId;
    const userId = req.body.userId;
    const sqlSelect = SQL`UPDATE pets SET fostered_by=${userId} ,adoption_status="Fostered" WHERE pet_id=${petId};`;
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
