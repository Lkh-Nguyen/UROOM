const express = require("express");
const {loginCustomer} = require("./AuthController");

const authRouter = express.Router();

authRouter.post("/login_customer", loginCustomer);

module.exports = authRouter;