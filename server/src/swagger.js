import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API Documentation",
            version: "1.0.0",
            description: "API documentation for Express application",
        },
        servers: [
            {
                url: "http://localhost:5000/",
                description: "Development Server",
            },
        ],
    },
    apis: ["./src/routes/**.router.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}