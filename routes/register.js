const express = require("express");
const router = express.Router();
const { validationMid } = require("../middleware/validation");
const S = require("fluent-json-schema");
const SQL = require("@nearform/sql");
const mysql = require("mysql");

const registerSchema = require("../models/register.model");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const dotenv = require("dotenv").config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DB,
});

router.post("/register", validationMid(registerSchema), async (req, res) => {
  try {
    const { userFirstName, userLastName, userEmail, userPhone, userPassword } =
      req.body;

    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
      if (err) console.log(err);

      db.query(
        SQL`INSERT INTO users (user_fn, user_family_name, user_email, user_phone, user_password) values (?,?,?,?,?)`,
        [userFirstName, userLastName, userEmail, userPhone, hash],
        (err, result) => console.log(err)
      );
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
