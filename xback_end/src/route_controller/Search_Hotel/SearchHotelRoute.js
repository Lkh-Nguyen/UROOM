const express = require("express");
const SearchHotelRoute = express.Router();
const SearchController = require("./SearchHotelController");

SearchHotelRoute.get("/", SearchController.searchAndFilterHotels);

module.exports = SearchHotelRoute;