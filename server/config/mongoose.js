const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongo Connected");
  } catch (err) {
    console.log({err});
  }
};
module.exports = connectDatabase;