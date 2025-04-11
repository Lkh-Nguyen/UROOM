const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/route_controller/Auth/AuthRoute");
// const customerRoute = require("./src/route_controller/Customer/CustomerRouter");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Kết nối DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//from errorHandle
app.use(errorHandler);
//from cors
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
// app.use("/api/customer", customerRoute);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
