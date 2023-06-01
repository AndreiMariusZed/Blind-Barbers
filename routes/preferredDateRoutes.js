const express = require("express");
const preferredDateController = require("../controllers/preferredDateController");

const router = express.Router();

router
  .route("/")
  .get(preferredDateController.getPreferredDates)
  .post(preferredDateController.addPreferredDate);

module.exports = router;
