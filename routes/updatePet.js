const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const { validationMid } = require("../middleware/validation");
const updateSchema = require("../models/updatePet.model");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

router.put("/pet", validationMid(updateSchema), (req, res) => {
  const pet_id = req.body.pet_id;
  const pet_name = req.body.pet_name;
  const pet_weight = req.body.pet_weight;
  const pet_height = req.body.pet_height;
  const pet_color = req.body.pet_color;
  const pet_breed = req.body.pet_breed;
  const pet_dietry = req.body.pet_dietry;
  const pet_hypo = req.body.pet_hypo;
  const pet_bio = req.body.pet_bio;

  const petInfoColumnName =
    "pet_name=?, pet_height=?, pet_weight=?, pet_color=?, pet_hypoallergenic=?, pet_dietary=?, pet_breed =?, pet_bio =?";
  db.query(
    `UPDATE pets SET ${petInfoColumnName} WHERE pet_id = ?;`,
    [
      pet_name,
      pet_height,
      pet_weight,
      pet_color,
      pet_hypo,
      pet_dietry,
      pet_breed,
      pet_bio,
      pet_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`You updated ${pet_name}'s Information!`);
      }
    }
  );
});

module.exports = router;
