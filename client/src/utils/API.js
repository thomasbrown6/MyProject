import axios from "axios";

export default {
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
  }
};
