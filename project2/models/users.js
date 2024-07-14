const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("User", userSchema);
