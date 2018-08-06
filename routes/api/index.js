const router = require("express").Router();
const billRoutes = require("./bills");

// Book routes
router.use("/bills", billRoutes);

module.exports = router;