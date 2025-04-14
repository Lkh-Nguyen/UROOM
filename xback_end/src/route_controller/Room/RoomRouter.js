const express = require("express");
const roomController = require("./RoomController");

const Roomrouter =  express.Router();

Roomrouter.get("/rooms_information/:hotelId", roomController.getRoomsByHotel);

module.exports = Roomrouter; 
