import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FeedbackRouter from "./routers/FeedbackRouter.js";
import path from "path";
const __dirname = path.resolve()
dotenv.config();

//Setup Port
const app = express();

const PORT = process.env.PORT || 5000;

const URI = "mongodb+srv://vietphamquoc1211999:vietphamquoc1211999@cluster0.c7fwdje.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use("/feedback", FeedbackRouter);
app.use(express.static("public"));

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.log("err", err);
  });
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// module.exports = app;
