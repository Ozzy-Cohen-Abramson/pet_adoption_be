const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const SQL = require("@nearform/sql");
const { validationMid } = require("../middleware/validation");
const updatePassSchema = require("../models/updatePass.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

router.put("/passupdate", validationMid(updatePassSchema), (req, res) => {
  const user_pass = req.body.user_pass;
  const user_id = req.body.user_id;
  const user_prev_pass = req.body.user_prev_pass;
  const userColumns = "user_password = ?";
  if (user_id) {
    db.query(
      SQL`SELECT * FROM users WHERE user_id = ?;`,
      user_id,
      (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
          bcrypt.compare(
            user_prev_pass,
            result[0].user_password,
            (error, response) => {
              if (error) console.log(error);
              if (response) {
                bcrypt.hash(user_pass, saltRounds, (err, hash) => {
                  if (err) console.log(err);

                  db.query(
                    `UPDATE users SET ${userColumns} WHERE user_id = ?;`,
                    [hash, user_id],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.send(result);
                      }
                    }
                  );
                });

                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(result);
                  }
                };
              } else {
                console.log("Wrong password");
                res.send({ message: "Wrong password" });
              }
            }
          );
        }
      }
    );
  }
  //   db.query(
  //     `UPDATE users SET ${userColumns} WHERE user_id = ?;`,
  //     [user_pass, user_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
});

module.exports = router;
