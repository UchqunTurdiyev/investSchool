const { Router } = require("express");
const { verifyTokenAdmin, verifyToken } = require("../middleware/verifyToken");
const router = Router();
const Sciences = require("../models/sciences");
const Teacher = require("../models/teachers");

router.get("/sciences", verifyToken, async (req, res) => {
  try {
    const sciences = await Sciences.find();
    if (sciences.length == 0) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json(sciences);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sciences/:id", verifyToken, async (req, res) => {
  try {
    const teachers = await Teacher.find({ sciencesId: req.params.id });
    if (teachers.length == 0) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json({ teachers });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/sciences", verifyTokenAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(422).json({ error: "Please enter your information" });
    }
    const sciences = new Sciences({
      name,
    });
    await sciences.save();
    res.status(200).json({ msg: "succesfully", sciences });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/sciences/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const sciencesUpdate = await Sciences.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ sciencesUpdate, msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/sciences/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Sciences.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
