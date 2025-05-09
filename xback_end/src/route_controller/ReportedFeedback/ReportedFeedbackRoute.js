const express = require("express");
const ReportFeedbackRouter = express.Router();
const ReportFeedbackController = require('./ReportedFeedbackController');
const checkCustomer = require('../../middlewares/checkCustomer');



ReportFeedbackRouter.get("/getAllReportedFeedbacks",  ReportFeedbackController.getAllReportedFeedbacks);
ReportFeedbackRouter.put('/update_Report/:reportId', checkCustomer, ReportFeedbackController.updateReportStatus);
ReportFeedbackRouter.delete('/delete_report_feedback/:reportId', checkCustomer, ReportFeedbackController.deleteReportedFeedback);
ReportFeedbackRouter.post("/create_report_feedback", checkCustomer, ReportFeedbackController.reportFeedback);
ReportFeedbackRouter.get("/my-reports", checkCustomer, ReportFeedbackController.getReportedFeedbackByUserId);

module.exports = ReportFeedbackRouter;

