const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

const courseData = require("./public/data.json");

const sendMail = async function (details) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  return await new Promise((resolve, reject) => {
    mailTransporter.sendMail(details, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
        console.log("send");
      }
    });
  });
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/mail", async (req, res) => {
  try {
    const details = {
      from: `${process.env.AUTH_EMAIL}`,
      to: `${process.env.REC_EMAIL}`,
      subject: `Someone is intersted to join Musicraft Academy`,
      text: `This person was interested to join here are the details
        ${req.body.name}
        ${req.body.email}
        ${req.body.phone}
      `,
    };
    await sendMail(details);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Error sending email");
  }
});

app.get("/course/:id", (req, res) => {
  const courseName = req.params.id;
  const course = courseData.find((course) => course.course == courseName);
  function splitOutcomes(text) {
    let arr = [];
    text.split(/\n/).map((item) => arr.push(item));
    return arr;
  }
  if (!course) {
    res.status(404).json("not found course");
  }
  let courseTopics = splitOutcomes(course.topics);
  res.render("course", { course, courseTopics });
});

app.get("/hello", (req, res) => res.send("Hello World!"));

app.listen(8000, () => {
  console.log("started server");
});
