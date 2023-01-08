const {Schema, model} = require("mongoose");

const teacherSchema = new Schema({
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  img: {type: String, required: true},
  description: {type: String, required: true},
  phoneNumber: {type: Number, required:true},
  userId: {type: Schema.Types.ObjectId, ref: "User"},
  sciencesId: {type: Schema.Types.ObjectId, ref: "Sciences"},
},
{
  timestamps: true
});
const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;