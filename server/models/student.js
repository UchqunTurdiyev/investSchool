const {Schema, model} = require("mongoose");

const studentSchema = new Schema({
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  img: {type: String, required: true},
  parentsNumber: {type: Number, required: true},
  description: {type: String, required: true},
  phoneNumber: {type: Number, required:true},
  userId: {type: Schema.Types.ObjectId, ref: "User"},
  classId: {type: Schema.Types.ObjectId, ref: "Class"}
},
{
  timestamps: true
});
const Student = model("Student", studentSchema);
module.exports = Student;