const router = require("express").Router();
const axios = require('axios')
const nodemailer = require('nodemailer');
const Pub = require('../models/Pub.model')
const Admin = require('../models/Admin.model')
const bcrypt = require('bcryptjs');
require('dotenv').config();
const cors = require("cors");

router.get("/pubs", (req, res, next) => {
  Pub.find()
  .then(pubs => {
    res.status(200).json(pubs)
  })
  .catch(err => console.log(err))
});


router.post("/validatecaptcha", cors(), (req, res) => {
      const {token, watchSuggestion} = req.body;
      
      axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
        )
      .then((response) => {
      if (!token) {
        return (
          res.status(400).json('Nocaptcha')
        )
      }
      if (response.status===200) {
          console.log("captcha good");
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            },
        })
        
        const mailOptions = {
            from: {
                name: 'Pokie Free Pubs',
                address: 'pokiefreepubsandclubs@gmail.com'
            },
            to: 'pokiefreepubsandclubs@gmail.com',
            subject: 'Suggestion',
            text: watchSuggestion
        }
        
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json('mail sent')
            }
        })
      }
      else
      {
        res.send("Robot");
      }
    })
    .catch(err => console.log(err))
  });

  router.post('/submitpub', (req, res) => {
    const { name, street, city, state, postcode, image, longitude, latitude, websiteLink, dateVerified, password } = req.body.data
    Admin.findOne()
    .then((admin) => {
      const passwordCorrect = bcrypt.compareSync(password, admin.password);

      if (!passwordCorrect){
        res.status(400).json({ messageUserExists: "Password is incorrect." });
      }
      else {
        Pub.findOne({ name })
        .then((foundPub) => {
          if (foundPub) {
            res.status(400).json({ messageUserExists: "User already exists." });
            return;
          }
        Pub.create({ name, street, city, state, postcode, image, longitude, latitude, websiteLink, dateVerified })
        .then(pub => {
          res.status(200).json({ messageUserExists: "Pub successfully added" });
        })
        .catch(err => console.log(err))
        })
      }
    })
    .catch(err => console.log(err))
  })

module.exports = router;
