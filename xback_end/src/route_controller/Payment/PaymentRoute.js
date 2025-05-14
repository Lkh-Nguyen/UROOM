const express = require("express");
const PaymentRouter = express.Router();

const PaymentController = require("./PaymentController");
const checkCustomer = require("../../middlewares/checkCustomer");

PaymentRouter.post("/create-booking", checkCustomer, PaymentController.createBooking)
PaymentRouter.post("/cancel-payment", checkCustomer, PaymentController.cancelPayment)
PaymentRouter.post("/accept-payment", checkCustomer, PaymentController.acceptPayment)

module.exports = PaymentRouter;