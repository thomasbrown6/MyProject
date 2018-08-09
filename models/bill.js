
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  payee: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: String, required: true },
  dueDate: { type: Date, default: Date.now }
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
