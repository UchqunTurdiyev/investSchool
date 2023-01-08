const {Schema, model} = require("mongoose");

const raitingSchema = new Schema({
  studentId: {type: Schema.Types.ObjectId, ref: "Student"},
  teacherId: {type: Schema.Types.ObjectId, ref: "Teacher"},
  raiting: {type: Number, required: true},
  description: {type: String},
  scheduleId: {type: Schema.Types.ObjectId, ref: "Schedule"}
},
{
  timestamps: true
});
const Raiting = model("Raiting", raitingSchema);
module.exports = Raiting;