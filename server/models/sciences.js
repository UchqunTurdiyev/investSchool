const {Schema, model } = require("mongoose");

const sciencesSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});
const Sciences = model("Sciences", sciencesSchema);
module.exports = Sciences;