const router = require("express").Router();
const axios = require('axios')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.post("/validatecaptcha", async (req, res) => {
      const {token} = req.body;
      await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
        );
  
        if (res.status(200)) {
          res.send("Good");
      }else{
        res.send("Robot");
      }
  });

module.exports = router;
