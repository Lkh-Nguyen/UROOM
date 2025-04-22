const express = require('express')
const FeedbackRouter = express.Router();
const FeedbackController = require('./FeedbackController')
const checkCustomer = require("../../middlewares/checkCustomer"); 
FeedbackRouter.get('/get-feedback-hotel/:hotelId', FeedbackController.getAllFeedBackByHotelId)
FeedbackRouter.get("/my-feedbacks", checkCustomer, FeedbackController.getFeedbackByUserId);
FeedbackRouter.put('/update-feedback/:feedbackId', checkCustomer, FeedbackController.updateFeedback);
FeedbackRouter.delete('/delete-feedback/:feedbackId', checkCustomer, FeedbackController.deleteFeedback);
module.exports = FeedbackRouter;