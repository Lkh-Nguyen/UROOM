const ApiConstants = {
  //AUTH:
  LOGIN_OWNER: "/auth/login_owner",
  //FEEDBACK:
  FEEDBACK_HOTEL: "/feedback/get-feedback-hotel/:hotelId",
  ///REPORTFEEDBACK
  REPORT_FEEDBACK: "reportFeedback/create_report_feedback_owner",
  FETCH_REPORTS_BY_USERID: "reportFeedback/my-reports",
  DELETE_REPORTED_FEEDBACK: "reportFeedback/delete_report_feedback/:reportId",
  //HOTEL
  FETCH_OWNER_HOTEL: "/hotel/owner-hotels",
  UPDATE_HOTEL: "/hotel/update-hotel",
  CHANGE_STATUS_HOTEL: "/hotel/changeStatus-hotel",
  //RESERVATION
  RESERVATIONS: "/payment/reservations",
};

export default ApiConstants;
