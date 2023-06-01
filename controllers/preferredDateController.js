const PreferredDate = require("../models/preferredDateModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getPreferredDates = catchAsync(async (req, res, next) => {
  const preferredDates = await PreferredDate.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: preferredDates.length,
    data: {
      preferredDates,
    },
  });
});

exports.addPreferredDate = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newPreferredDate = await PreferredDate.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newPreferredDate,
    },
  });
});
