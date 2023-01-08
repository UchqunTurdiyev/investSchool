const { Router } = require("express");
const router = Router();
const Class = require("../models/class");
const Student = require("../models/student");
const { verifyTokenAdmin } = require("../middleware/verifyToken");

router.get("/class", async (req, res) => {
  try {
    const allClass = await Class.find();
    if (!allClass) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json(allClass);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/class/:id", async (req, res) => {
  try {
    const students = await Student.find({ classId: req.params.id })
    if (!students) {
      res.status(404).json({ msg: "Not found!" });
    }
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/class/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const classUpdate = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ classUpdate });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/class/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Class has been delete..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/class", verifyTokenAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const newClass = new Class({
      name,
    });
    await newClass.save();
    res.status(200).json(newClass);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
