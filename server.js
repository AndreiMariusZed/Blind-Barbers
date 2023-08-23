const puppeteer = require("puppeteer");
const express = require("express");
const mongoose = require("mongoose");
const PreferredDate = require("./models/preferredDateModel");
const PhoneNumber = require("./models/phoneNumberModel");
require("dotenv").config();
let preferredDates;
let phoneNumbers;

const phoneFrom = `${process.env.PHONE_FROM}`;
const accountSid = `${process.env.ACCOUNT_SID}`;
const authToken = `${process.env.AUTH_TOKEN}`;
const client = require("twilio")(accountSid, authToken);

const phoneNumberRouter = require("./routes/phoneNumberRoutes");
const preferredDateRouter = require("./routes/preferredDateRoutes");

const app = express();
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use("/api/phonenumbers", phoneNumberRouter);
app.use("/api/preffereddates", preferredDateRouter);

const DB = process.env.DATABASE;

async function connect() {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful");
    preferredDates = await PreferredDate.find();
    phoneNumbers = await PhoneNumber.find();
    const justPhoneNumbers = phoneNumbers.map(
      (phoneNumber) => phoneNumber.number
    );
    const justPreferredDates = preferredDates.map(
      (PreferredDates) => PreferredDates.date
    );
    const phone = justPhoneNumbers[0];
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      await page.goto(
        "https://stailer.ro/widget/blind-barbers/programare-noua?salon=blind-barbers&stilist=MFVLAJDS&services=99034"
      );

      await page.setViewport({ width: 1080, height: 1024 });
      await page.screenshot({ path: "example.png" });

      const textSelector = await page.waitForSelector(".date-unavailable");
      const fullTitle = await textSelector?.evaluate((el) => el.textContent);
      justPreferredDates.forEach((date) => {
        if (fullTitle.includes(` ${date}`)) {
          client.messages
            .create({
              body: `Domnule dr.Bumbar, va puteti tunde in data de ${date}, https://stailer.ro/widget/blind-barbers/programare-noua?salon=blind-barbers&stilist=MFVLAJDS&services=99034`,
              from: phoneFrom,
              to: phone,
            })
            .then((message) => console.log(message.sid));
        }
      });
      await browser.close();
    })();
    setTimeout(connect, 30000);
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("server started on port 8000");
});
