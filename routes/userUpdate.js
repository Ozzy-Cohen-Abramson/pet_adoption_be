const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const { validationMid } = require("../middleware/validation");
const updateSchema = require("../models/updateUser.model");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

router.put("/user", validationMid(updateSchema), (req, res) => {
  const user_id = req.body.user_id;
  const user_fn = req.body.user_fn;
  const user_family_name = req.body.user_family_name;
  const user_email = req.body.user_email;
  const user_phone = req.body.user_phone;
  const user_pass = req.body.user_pass;
  const user_bio = req.body.user_bio;

  const userColumns =
    "user_fn = ? , user_family_name = ? , user_email = ? , user_phone = ?, user_password = ? , user_bio = ?";
  db.query(
    `UPDATE users SET ${userColumns} WHERE user_id = ?;`,
    [
      user_fn,
      user_family_name,
      user_email,
      user_phone,
      user_pass,
      user_bio,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
