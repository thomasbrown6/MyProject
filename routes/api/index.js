const router = require("express").Router();
const billRoutes = require("./bills");
const spendRoutes = require("./spending");
const userRoutes = require("./users");
const scrapeRoutes = require("./scrape");
const incomeRoutes = require("./income");

// Bill routes
router.use("/bills", billRoutes);
// Spending routes
router.use("/spending", spendRoutes)
// User routes
router.use("/users", userRoutes);
// Scrape routes
router.use("/scrape", scrapeRoutes);
// Income routes
router.use("/incomes", incomeRoutes);

module.exports = router;