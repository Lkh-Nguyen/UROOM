const express = require("express");
const  AuthController  = require("./AuthController");
const checkCustomer = require("../../middlewares/checkCustomer"); 
const authRouter = express.Router();

authRouter.post("/login_customer", AuthController.loginCustomer);
authRouter.post(
    "/updateProfile_customer",
    checkCustomer,
    AuthController.updateCustomerProfile
  );
  authRouter.post("/changePassword_customer", checkCustomer, AuthController.changePassword);
  
module.exports = authRouter;
