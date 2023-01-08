const {Schema, model} = require("mongoose");

const scheduleSchema = new Schema({
  startTime: {type: String, required: true},
  duration: {type: String, required: true},
  day: {type: String, required: true},
  sciencesId: {type:Schema.Types.ObjectId, ref: "Sciences"},
  teacherId: {type: Schema.Types.ObjectId, ref: "Teacher"},
  classId: {type: Schema.Types.ObjectId, ref: "Class"}
},{
  timestamps: true
})
const Schedule = model("Schedule", scheduleSchema);
module.exports = Schedule;