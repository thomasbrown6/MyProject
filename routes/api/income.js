const router = require("express").Router();
const incomesController = require("../../controllers/incomesController");

// Matches with "/api/income"
router.route("/")
  .get(incomesController.findAll)
  .put(incomesController.create)

// Matches with "/api/income/:id", may be needed later
router
  .route("/:id")
  .get(incomesController.findById)
  .put(incomesController.update)
  .delete(incomesController.remove);


module.exports = router;