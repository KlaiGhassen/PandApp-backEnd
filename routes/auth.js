require("dotenv").config();
const express = require("express");
const userdb = require("../models/user");
const router = express.Router();
var nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
var val;
//get one email

router.post("/reset", (req, res) => {
  val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);

  try {
    let email = req.body.email;
    userdb.find({ email: email }).then((user) => {
      compte = user[0];
      if (compte) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "pimmpim40@gmail.com",
            pass: "123456789azer@@",
          },
        });
        var mailOptions = {
          from: "pimmpim40@gmail.com",
          to: compte.email,
          subject: "Reset password",
          text: "your code is :" + val,
          html: "<p>HTML version of the message</p>"
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.json({
          isemail: true,
        });
      } else {
        res.json({
          isemail: false,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});



router.post("/verfiy", (req, res) => {
  val = Math.floor(1000 + Math.random() * 9000);
  try {
    let email = req.body.email;
    userdb.find({ email: email }).then((user) => {
      compte = user[0];
      if (compte) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "pimmpim40@gmail.com",
            pass: "123456789azer@@",
          },
        });
        var mailOptions = {
          from: "pimmpim40@gmail.com",
          to: compte.email,
          subject: "Reset password",
          text: "your verification code is : " + val,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json({
          isemail: true,
        });
      } else {
        res.json({
          isemail: false,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/verfy", getUserEmail, async (req, res) => {
    
   if (req.body.code == val) {
    res.user.verified = true;
  }
    try {
      res.user.save().then((updateduser) => {
        res.json(
          updateduser
        );
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
 
});



router.post("/socauth", (req, res) => {
  try {
    let newUser = new userdb({
      nom: req.body.nom,
      email: req.body.email,
      prenom: req.body.prenom,
      image: req.body.image,
      social: true,
      verified: true,
    });
    userdb.find({ email: newUser.email }).then((sss) => {
      ss = sss[0];
      console.log(ss);
      if (ss) {
        let payload = {
          id: ss.id,
          role: ss.role,
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({
          token: token,
          user: ss,
        });
      } else {
        newUser.save().then((user) => {
          console.log("hello", user);
          compte = user;
          if (compte) {
            let payload = {
              id: compte.id,
              role: compte.role,
            };
            console.log(payload);
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            console.log("hello", compte);

            res.json({
              token: token,
              user: compte,
            });
          } else {
            res.status(401);
            res.json({
              error: "UNAUTHORIZED",
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err.code);
    if (err.code === 11000) {
      res.json({ created: true });
    }
  }
});
router.post("/", (req, res) => {
  try {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    userdb.find({ email: email, password: password }).then((user) => {
      compte = user[0];
      if (compte) {
        let payload = {
          id: compte.id,
          role: compte.role,
        };
        console.log(payload);
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        let userLogin = {
          token: token,
          identifant: compte.identifant,
          email: compte.email,
          password: compte.password,
          phoneNumber: compte.phoneNumber,
          profilePicture: compte.profilePicture,
          FirstName: compte.FirstName,
          LastName: compte.LastName,
          social: compte.social,
          role: compte.role,
          verified: compte.verified,
          className: compte.className,
          description: compte.description,
        };
        res.json(userLogin);
      } else {
        res.status(401);
        res.json({
          error: "UNAUTHORIZED",
        });
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

router.patch("/reset", getUserEmail, async (req, res) => {
  if (req.body.password != null) {
    
   if (req.body.code == val) {
    res.user.password = req.body.password;
  }

    try {
      res.user.save().then((updateduser) => {
        res.json(
          updateduser
        );
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
   } else {
     res.json({ code: false });
   }
});


async function getUserEmail(req, res, next) {
  try {
    user = await userdb.find({ email : req.body.email });
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user[0];
  next();
}

module.exports = router;
