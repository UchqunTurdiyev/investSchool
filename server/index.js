const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/mongoose");

dotenv.config();
connectDatabase();
const app = express();

require("./models/user");
require("./models/student");
require("./models/teachers");
require("./models/sciences");
require("./models/schedule");
require("./models/raiting");

app.use(express.json());
app.use(require("./routes/register"));
app.use(require("./routes/user"));
app.use(require("./routes/student"));
app.use(require("./routes/teachers"));
app.use(require("./routes/class"));
app.use(require("./routes/sciences"));
app.use(require("./routes/schedule"));
app.use(require("./routes/raiting"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has been started ${PORT}`);
})

// UNj9BD7BNa3himIV