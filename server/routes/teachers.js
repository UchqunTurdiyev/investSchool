const { Router } = require("express");
const {
  verifyTokenControl,
  verifyTokenAdmin,
  verifyToken
} = require("../middleware/verifyToken");
const router = Router();
const Teacher = require("../models/teachers");

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (!teachers) {
      res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/teachers/:id", async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404).json({ error: "Not found!" });
  }
  res.status(200).json(teacher);
});

router.put("/teachers/:id", verifyTokenControl, async (req, res) => {
  try {
    const teacherUpdate = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(teacherUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/teachers/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/teachers", verifyToken, async (req, res) => {
  try {
    const { sciences_id } = req.query;
    const { firstName, lastName, phoneNumber, img, description } = req.body;
    if (!firstName || !lastName || !phoneNumber || !description || !img) {
      res.status(422).json({ error: "Please fill in all information" });
    }
    const newTeachers = new Teacher({
      firstName,
      lastName,
      description,
      phoneNumber,
      img,
      userId: req.user._id,
      sciencesId: sciences_id,
    });
    await newTeachers.save();
    res.status(200).json({newTeachers, msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
