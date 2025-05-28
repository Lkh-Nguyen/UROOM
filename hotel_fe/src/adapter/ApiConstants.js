const ApiConstants = {
  //AUTH:
  LOGIN_OWNER: "/auth/login_owner",
  //FEEDBACK:
  FEEDBACK_HOTEL: "/feedback/get-feedback-hotel/:hotelId",
  FETCH_FEEDBACK_BY_ID:"/feedback/getFeedbackById/:feedbackId",
  ///REPORTFEEDBACK
  REPORT_FEEDBACK: "reportFeedback/create_report_feedback_owner",
  FETCH_REPORTS_BY_USERID: "reportFeedback/my-reports",
  DELETE_REPORTED_FEEDBACK: "reportFeedback/delete_report_feedback/:reportId",
  //HOTEL
  FETCH_OWNER_HOTEL: "/hotel/owner-hotels",
  UPDATE_HOTEL: "/hotel/update-hotel",
  CREATE_HOTEL_SERVICE: "/hotel/add-service",
  UPDATE_HOTEL_SERVICE: "/hotelservices/update-service",
  UPDATE_HOTEL_SERVICE_STATUS: "/hotel/updateStatusService/:hotelId/status",
  CHANGE_STATUS_HOTEL: "/hotel/changeStatus-hotel",
  //RESERVATION
  RESERVATIONS: "/payment/reservations",
  //MONTHLYPAYMENT
  MONTHLY_PAYMENTS: "/monthly-payment/all",
};

export default ApiConstants;
