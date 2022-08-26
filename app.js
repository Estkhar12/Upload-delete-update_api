require('dotenv').config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const authroutes = require("./routes/auth");


const app = express();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

app.use(multer({ storage: storage }).single("file"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, PATCH, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authroutes);

app.use((error, req, res, next) => {
  const err = new Error("Error Not Found!");
  error.status = 404;
  throw err;
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("server is start on 3000 port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
