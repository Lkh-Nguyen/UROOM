const express = require("express");
const ReservationRouter = express.Router();
const ReservationController = require("./ReservationController");
const checkCustomer = require("../../middlewares/checkCustomer");


ReservationRouter.get(
  '/detail/:reservationId',
  checkCustomer,
  ReservationController.getReservationDetailById
)

module.exports = ReservationRouter;