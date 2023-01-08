const router = require("express").Router();
const axios = require('axios')
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require("cors");

router.get("/", (req, res, next) => {
  res.json("All good in here");
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
          res.send("Good");
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
        
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.log(err)
                // res.status(401).json('there was an error', err)
            }
            else {
                console.log(response)
                // res.status(200).json('email sent')
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

module.exports = router;
