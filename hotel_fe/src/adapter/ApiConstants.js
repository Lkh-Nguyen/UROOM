const ApiConstants = {
  //AUTH:
  LOGIN_OWNER: "/auth/login_owner",
  //FEEDBACK:
  FEEDBACK_HOTEL: "/feedback/get-feedback-hotel/:hotelId",
  //HOTEL:
  FETCH_HOTELS_BY_IDS: "/hotel/get-hotel-byId",
  ///REPORTFEEDBACK
  REPORT_FEEDBACK: "reportFeedback/create_report_feedback_owner",
  FETCH_REPORTS_BY_USERID: "reportFeedback/my-reports",
  DELETE_REPORTED_FEEDBACK: "reportFeedback/delete_report_feedback/:reportId",
};

export default ApiConstants;
