const express = require("express");
const HotelRouter = express.Router();
const HotelController = require("./HotelController");
const checkCustomer = require("../../middlewares/checkCustomer");
const checkGuest = require("../../middlewares/cheskGuest");

HotelRouter.get("/get-all-hotel", HotelController.getAllHotels);
HotelRouter.post("/get-hotel-byId", HotelController.getHotelsByIds);
HotelRouter.post("/remove-favorite", checkCustomer, HotelController.removeFavoriteHotel);
HotelRouter.post("/add-favorite", checkCustomer, HotelController.addFavoriteHotel);
HotelRouter.get("/hotel_detail/:hotelId", checkGuest, HotelController.getHotelDetails);
HotelRouter.get("/top-bookings", checkGuest,HotelController.getTop3HotelsThisMonth);
module.exports = HotelRouter;
