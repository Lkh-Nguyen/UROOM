const express = require("express");
const  AuthController  = require("./AuthController");
const checkCustomer = require("../../middlewares/checkCustomer"); 
const authRouter = express.Router();

// Registration and verification routes
authRouter.post("/register_customer", AuthController.registerCustomer);
authRouter.post("/verify-email", AuthController.verifyEmail);
authRouter.post("/resend-verification", AuthController.resendVerificationCode);

// Existing routes
authRouter.post("/login_customer", AuthController.loginCustomer);
authRouter.post(
    "/updateProfile_customer",
    checkCustomer,
    AuthController.updateCustomerProfile
  );
authRouter.post("/changePassword_customer", checkCustomer, AuthController.changePassword);
  
module.exports = authRouter;
