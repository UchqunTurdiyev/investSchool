const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    const { userName, password, rol, email } = req.body;
    if (!email || !userName || !rol || !password) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res.status(422).json({ error: "This email is already registered" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      rol,
      email,
      password: hashPass,
    });
    user.save();
    const token = jwt.sign(
      { _id: user._id, rol: user.rol },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token: token, msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res.status(422).json({ error: "Please check your email" });
    }
    const doMatch = await bcrypt.compare(password, savedUser.password);
    if (doMatch) {
      const token = jwt.sign(
        { _id: savedUser._id, rol: savedUser.rol },
        process.env.JWT_SECRET
      );
      res.json({ token: token, msg: "Welcome to your profile" });
    } else {
      return res
        .status(422)
        .json({ error: "You have entered an incorrect password" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
