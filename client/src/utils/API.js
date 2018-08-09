import axios from "axios";

export default {
  // ============================
  // BILL FUNCTIONS
  // ============================
  
  // Gets all bills
  getBills: function() {
    return axios.get("/api/bills");
  },
  // Gets the bill with the given id
  getBill: function(id) {
    return axios.get("/api/bills/" + id);
  },
  // Deletes the bill with the given id
  deleteBill: function(id) {
    return axios.delete("/api/bills/" + id);
  },
  // Saves a bill to the database
  saveBill: function(billData) {
    return axios.post("/api/bills", billData);
  },
  // Updates a bill to the database
  updateBill: function(id) {
      return axios.put("/api/bills", id);
  },



  // ============================
  // SPENDING FUNCTIONS
  // ============================

  // Gets all spending
  getAllSpending: function() {
    return axios.get("/api/spending");
  },
  // Gets the spending with the given id
  getSpending: function(id) {
    return axios.get("/api/spending/" + id);
  },
  // Deletes the spending with the given id
  deleteSpending: function(id) {
    return axios.delete("/api/spending/" + id);
  },
  // Saves a spending to the database
  saveSpending: function(spendingData) {
    return axios.post("/api/spending", spendingData);
  },
  // Updates a spending to the database
  updateSpending: function(id) {
      return axios.put("/api/spending", id);
  }
};
