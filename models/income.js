const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  email: {type: String,required: true}
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;