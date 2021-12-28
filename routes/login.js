const express = require("express");
const router = express.Router();
const { validationMid } = require("../middleware/validation");
// const jwt = require("jsonwebtoken");
const SQL = require("@nearform/sql");
const mysql = require("mysql");

const loginSchema = require("../models/login.model");

// const { authenticateToken } = require("../middleware/authenticateToken");

const bcrypt = require("bcrypt");

// const dotenv = require("dotenv").config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DB,
});

router.get("/login", (req, res) => {
  try {
    if (req.session.user) {
      res.send({ login: true, user: req.session.user });
    } else {
      res.send({ login: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", validationMid(loginSchema), (req, res) => {
  const { userEmail, userPassword, loginStatus } = req.body;

  if (userEmail) {
    db.query(
      SQL`SELECT * FROM users WHERE user_email = ?;`,
      userEmail,
      (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
          bcrypt.compare(
            userPassword,
            result[0].user_password,
            (error, response) => {
              if (error) console.log(error);
              if (response) {
                req.session.user = result;
                res.send(result);
              } else {
                console.log("Wrong email/password");
                res.send({ message: "Wrong email/password" });
              }
            }
          );
        } else res.send({ message: "User does not exist" });
      }
    );
  } else if (!loginStatus) {
    req.session.destroy(function (err) {
      console.log("User is logged out!");
    });
  }
  // const user = { userEmail, userPassword };
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // res.json({ accessToken: accessToken });
});

module.exports = router;
