const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

router.post("/adminlogin", express.json(), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const data = await User.findOne({ email });
    if (data) {
      const bytes = CryptoJS.AES.decrypt(
        data.password,
        process.env.CRYPTO_SECRET_KEY
      );
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (password === originalText) {
        var token = jwt.sign({email: data.email }, process.env.JWT_SECRET_KEY);
        res
          .status(200)
          .json({ success: true, message: "login successfully" , token});
      } else {
        res
          .status(400)
          .json({ success: false, message: "password does not match" });

      }
    } else {
      res.status(400).json({ success: false, message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
});

module.exports = router;
