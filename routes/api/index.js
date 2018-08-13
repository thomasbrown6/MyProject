const router = require("express").Router();
const billRoutes = require("./bills");
const spendRoutes = require("./spending");
const userRoutes = require("./users");

// Bill routes
router.use("/bills", billRoutes);
// Spending routes
router.use("/spending", spendRoutes)
// User routes
router.use("/users", userRoutes);

module.exports = router;