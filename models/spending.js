const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  item: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  //added email to associate user to their spending
  email: {type: String,required: true}
});

const Spending = mongoose.model("Spending", spendingSchema);

module.exports = Spending;
