const mongoose = require("mongoose");

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
  },
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

module.exports = PhoneNumber;
