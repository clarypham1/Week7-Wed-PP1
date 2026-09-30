const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler, requestLogger } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger); 
connectDB();

app.use("/api/product", productRouter);
// Use the userRouter for all "/users" routes
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;