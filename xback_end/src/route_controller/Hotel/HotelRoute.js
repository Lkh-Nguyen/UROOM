const express = require("express");
const HotelRouter = express.Router();
const HotelController = require("./HotelController");

//GET
HotelRouter.get("/get-all-hotel", HotelController.getAllHotels); //customer

module.exports = HotelRouter;