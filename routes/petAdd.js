const express = require("express");
const router = express.Router();
// const { validationMid } = require("../middleware/validation");
const S = require("fluent-json-schema");
const SQL = require("@nearform/sql");
const mysql = require("mysql");
const dotenv = require("dotenv").config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DB,
});

router.post("/insert", (req, res) => {
  try {
    const petType = req.body.pet_type;
    const petName = req.body.pet_name;
    const petStatus = req.body.adoption_status;
    const petImg = req.body.pet_picture;
    const petHeight = req.body.pet_height;
    const petWeight = req.body.pet_weight;
    const petColor = req.body.pet_color;
    const petHypoallergenic = req.body.pet_hypoallergenic;
    const petDiet = req.body.pet_dietry;
    const petBreed = req.body.pet_breed;
    const petBio = req.body.pet_bio;

    const petInfoColumnName =
      "(pet_type, pet_name, adoption_status, pet_picture, pet_height, pet_weight, pet_color, pet_hypoallergenic, pet_dietary, pet_breed, pet_bio)";
    const sqlInsert = `INSERT INTO pets ${petInfoColumnName} VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    db.query(
      sqlInsert,
      [
        petType,
        petName,
        petStatus,
        petImg,
        petHeight,
        petWeight,
        petColor,
        petHypoallergenic,
        petDiet,
        petBreed,
        petBio,
      ],
      (err, result) => {
        console.log(err);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
