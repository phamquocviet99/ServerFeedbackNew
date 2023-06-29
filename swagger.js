import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for your API",
    },
  },
  apis: ["./routers/FeedbackRouter.js", "./routers/ContactRouter.js"], // Đường dẫn đến các tệp tin chứa các route của bạn
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
