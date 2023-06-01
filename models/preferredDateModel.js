const mongoose = require("mongoose");

const preferredDateSchema = new mongoose.Schema({
  date: {
    type: String,
  },
});

const PreferredDate = mongoose.model("PreferredDate", preferredDateSchema);

module.exports = PreferredDate;
