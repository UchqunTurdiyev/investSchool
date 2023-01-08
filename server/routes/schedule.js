const { Router } = require("express");
const { verifyTokenAdmin, verifyToken } = require("../middleware/verifyToken");
const router = Router();
const Schedule = require("../models/schedule");

router.get("/schedule", verifyToken, async (req, res) => {
  try {
    const { day } = req.query;
    const classSchedule = await Schedule.find({ day: day });
    if (classSchedule.length == 0) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json({ classSchedule });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/schedule/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const scheduleUpdate = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "succesfully", scheduleUpdate });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/schedule/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "succesfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/schedule", verifyTokenAdmin, async (req, res) => {
  try {
    const { sciences_id } = req.query;
    const { class_id } = req.query;
    const { teacher_id } = req.query;
    const { startTime, duration, day } = req.body;
    if (!startTime || !duration || !day) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const newSchedule = new Schedule({
      startTime,
      duration,
      day,
      sciencesId: sciences_id,
      classId: class_id,
      teacherId: teacher_id,
    });
    await newSchedule.save();
    res.status(200).json({ msg: "succesfully", newSchedule });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
