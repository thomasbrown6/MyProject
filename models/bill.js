
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  payee: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, default: Date.now },
  
  //added email to bills table to associate with user
  email: { type: String, required:true},
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
