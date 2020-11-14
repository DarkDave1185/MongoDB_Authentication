const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//EXPRESS SETUP

const app = express();
app.use(express.json());
app.use(cors());

//PORT SETUP

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER ON PORT: ${PORT}`));

//MONGOOSE SETUP

mongoose.connect(
  process.env.MONGODB_CONNECTION,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MONGODB CONNECTED");
  }
);

//MIDDLEWARE ROUTES SETUP

app.use("/users", require("./routes/userRouter"));
