const router = require("express").Router();
const billRoutes = require("./bills");
const spendRoutes = require("./spending");

// Bill routes
router.use("/bills", billRoutes);
// Spending routes
router.use("/spending", spendRoutes)

module.exports = router;