const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// DB Config
const db = require("./config/config").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/recipes", require("./routes/recipes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
