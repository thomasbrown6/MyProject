
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email:{
    type: String,
    required:true
  }
});

// This creates our model from the above schema, using mongoose's model method
const user = mongoose.model("User", userSchema);

// Export the User model
module.exports = user;
