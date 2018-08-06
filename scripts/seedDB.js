const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/bills"
);

const billsSeed = [
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"327.41"
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"1295.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"112.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20170801",
    recurring: "monthly",
    amount:"529.87"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"1295.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"93.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20170901",
    recurring: "monthly",
    amount:"492.47"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"1295.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"87.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20171001",
    recurring: "monthly",
    amount:"295.38"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"1295.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"123.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"98.43"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"99.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20171101",
    recurring: "monthly",
    amount:"510.29"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"1295.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"123.12"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"98.43"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"99.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20171201",
    recurring: "monthly",
    amount:"490.10"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"147.33"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180101",
    recurring: "monthly",
    amount:"947.01"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"128.88"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180201",
    recurring: "monthly",
    amount:"311.94"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"122.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"98.43"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"99.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180301",
    recurring: "monthly",
    amount:"378.78"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"89.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"98.43"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180401",
    recurring: "monthly",
    amount:"411.84"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"79.33"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180501",
    recurring: "monthly",
    amount:"438.84"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"107.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"79.41"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"89.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180601",
    recurring: "monthly",
    amount:"505.38"	
  },
  {
    payee: "Car Loan",
    category: "Automotive",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"327.41"	
  },
  {
    payee: "Rent",
    category: "Housing",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"1345.00"	
  },
  {
    payee: "Car Insurance",
    category: "Automotive",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"83.33"	
  },
  {
    payee: "Electricity",
    category: "Utility",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"122.10"	
  },
  {
    payee: "Phone",
    category: "Utility",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"98.43"	
  },
  {
    payee: "Cable",
    category: "Utility",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"99.99"	
  },
  {
    payee: "Credit Card",
    category: "Spending",
    dueDate: "20180701",
    recurring: "monthly",
    amount:"623.90"	
  }
];

db.Bill
  .find({})
  .remove({})
  .then(() => db.Bill.collection.insertMany(billsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
