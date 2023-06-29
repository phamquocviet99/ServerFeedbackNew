import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FeedbackRouter from "./routes/FeedbackRouter.js";
import ContactRouter from "./routes/ContactRouter.js";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const __dirname = path.resolve();
dotenv.config();

//Setup Port
const app = express();

const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://vietphamquoc1211999:vietphamquoc1211999@cluster0.c7fwdje.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use("/feedback", FeedbackRouter);
app.use("/contacts", ContactRouter);
app.use(express.static("public"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bloem Vendor API",
      version: "1.0.0",
      description: "API for Bloem/Capstone Project",
    },
    servers: [
      {
        // url: "https://bloem-api.onrender.com/"
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
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
