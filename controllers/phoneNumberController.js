const PhoneNumber = require("../models/phoneNumberModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getPhoneNumbers = catchAsync(async (req, res, next) => {
  const phoneNumbers = await PhoneNumber.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: phoneNumbers.length,
    data: {
      phoneNumbers,
    },
  });
});

exports.addPhoneNumber = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newPhoneNumber = await PhoneNumber.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newPhoneNumber,
    },
  });
});

exports.re = catchAsync(async (req, res, next) => {
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
  });
});
