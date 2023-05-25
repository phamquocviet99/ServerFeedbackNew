import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FeedbackRouter from "./routers/FeedbackRouter.js";
dotenv.config();

//Setup Port
const app = express();

const PORT = process.env.PORT || 5000;

const URI = "mongodb+srv://phamquocviet1211999:viet@viet.osqgshk.mongodb.net/";
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // limit from front-end data 30MB
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
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
// module.exports = app;
