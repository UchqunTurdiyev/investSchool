const { Router } = require("express");
const router = Router();
const Student = require("../models/student");
const {
  verifyToken,
  verifyTokenControl,
  verifyTokenAdmin,
} = require("../middleware/verifyToken");
const Raiting = require("../models/raiting");

router.get("/student/:id", verifyToken, async (req, res) => {
  try {
    const raiting = await Raiting.find({ studentId: req.params.id });
    if (!raiting) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json(raiting);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) {
      res.status(404).json({ msg: "Not found!" });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ msg: "Not found!" });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/student/:id", verifyTokenControl, async (req, res) => {
  try {
    const studentUpdate = await Student.updateOne(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ studentUpdate });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/student/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Student.deleteOne({ userId: req.params.id });
    res.status(200).json({ msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/student", verifyToken, async (req, res) => {
  const { class_id } = req.query;
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      parentsNumber,
      img,
      description,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !parentsNumber ||
      !description
    ) {
      res.status(422).json({ error: "Please fill in all information" });
    }
    const newStudent = new Student({
      firstName,
      lastName,
      phoneNumber,
      parentsNumber,
      img,
      description,
      userId: req.user._id,
      classId: class_id,
    });
    await newStudent.save();
    res.status(200).json({ newStudent, msg: "Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
