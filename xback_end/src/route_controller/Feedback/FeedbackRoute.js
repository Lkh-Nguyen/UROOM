const express = require('express')
const FeedbackRouter = express.Router();
const FeedbackController = require('./FeedbackController')

FeedbackRouter.get('/get-feedback-hotel/:hotelId', FeedbackController.getAllFeedBackByHotelId)

module.exports = FeedbackRouter;