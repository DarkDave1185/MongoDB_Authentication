const mongoose = require("mongoose");

//js object with format for information
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  displayName: { type: String },
});

mudule.export = User = mongoose.model("user", userSchema);
