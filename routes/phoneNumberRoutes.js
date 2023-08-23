const express = require("express");
const phoneNumberController = require("../controllers/phoneNumberController");

const router = express.Router();

router
  .route("/")
  .get(phoneNumberController.getPhoneNumbers)
  .post(phoneNumberController.addPhoneNumber);

router.route("/re").get(phoneNumberController.re);
module.exports = router;
