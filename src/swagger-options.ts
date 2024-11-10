import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nailted",
      version: "1.0.0",
      description: "This is a simple CRUD API of Nailted-Form",
      license: {
        name: "MIT",
        url: "http://mit.com",
      },
      contact: {
        name: "Los Chunguitos",
        url: "https://github.com/loschunguitos",
        email: "chunguitoss@example.com",
      },
    },
    server: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};
