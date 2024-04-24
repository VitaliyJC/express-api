import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import fs from "fs";
import router from "./routes/index.js";
import * as dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.set("view engine", "jade");
// раздавать статические файлы из папки  'upload'
app.use("/uploads", express.static("uploads"));

app.use("/api", router);

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const response = {
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  };

  // send the error in JSON format
  res.status(err.status || 500).json(response);
});
