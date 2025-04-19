const express = require('express')
const FeedbackRouter = express.Router();
const FeedbackController = require('./FeedbackController')
const checkCustomer = require("../../middlewares/checkCustomer"); 
FeedbackRouter.get('/get-feedback-hotel/:hotelId', FeedbackController.getAllFeedBackByHotelId)
module.exports = FeedbackRouter;