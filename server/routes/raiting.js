const { Router } = require("express");
const { verifyTokenAndTeacher } = require("../middleware/verifyToken");
const router = Router();
const Raiting = require("../models/raiting");

router.post("/raiting", verifyTokenAndTeacher, async (req, res) => {
  try {
    const { schedule_id } = req.query;
    const { student_id } = req.query;
    const { raiting, description } = req.body;
    if (!raiting) {
      return res.status(422).json({ error: "Please fill in all information" });
    }
    const newRaiting = new Raiting({
      raiting,
      description,
      scheduleId: schedule_id,
      studentId: student_id,
    });
    await newRaiting.save();
    res.status(200).json({ msg: "successfully", newRaiting });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/raiting/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    const raitingUpdate = await Raiting.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "succesfully", raitingUpdate });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
