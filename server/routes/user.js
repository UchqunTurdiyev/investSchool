const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  verifyTokenAdmin,
  verifyTokenSuperAdmin
} = require("../middleware/verifyToken");

router.get("/user", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    if (!user) {
      res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user", verifyTokenAdmin, async (req, res) => {
  try {
    const { userName, email, password, rol } = req.body;
    if (!userName || !email || !password || !rol) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(422)
        .json({ error: "This email is already registered" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      rol,
      password: hashPass,
    });
    await newUser.save();
    res.status(200).json({ newUser, msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/user/:id", verifyTokenSuperAdmin, async (req, res) => {
  try {
    if (req.body.password) {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPass;
    }
    const userUpdate = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User has been delete..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
