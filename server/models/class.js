const {Schema, model} = require("mongoose");

const classSchema = new Schema({
  name: {type: String, required:true}
},
{
  timestamps: true,
});
const Class = model("Class", classSchema);
module.exports = Class;