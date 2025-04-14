const express = require("express");
const HotelRouter = express.Router();
const HotelController = require("./HotelController");
const checkCustomer = require("../../middlewares/checkCustomer"); 
HotelRouter.get("/get-all-hotel", HotelController.getAllHotels); 
HotelRouter.post(
  "/get-hotel-byId",
  HotelController.getHotelsByIds
);
HotelRouter.post("/remove-favorite",checkCustomer, HotelController.removeFavoriteHotel);
HotelRouter.post("/add-favorite", checkCustomer, HotelController.addFavoriteHotel);
HotelRouter.get("/hotel_detail/:hotelId", HotelController.getHotelDetails);
module.exports = HotelRouter;
