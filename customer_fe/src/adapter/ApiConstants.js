const ApiConstants = {
  //AUTH:
  LOGIN_CUSTOMER: "/auth/login_customer",
  UPDATE_PROFILE: "/auth/updateProfile_customer",
  CHANGE_PASSWORD: "/auth/changePassword_customer",
  UPDATE_AVATAR: "/auth/update_avatar",

  //SEARCH:
  SEARCH_HOTEL: "/search",
  FETCH_FAVORITE_HOTELS: "/hotel/get-hotel-byId",
  REMOVE_FAVORITE_HOTELS: "/hotel/remove-favorite",
  ADD_FAVORITE_HOTELS: "/hotel/add-favorite",

  FETCH_DETAIL_HOTELS: "/hotel/hotel_detail/:hotelId",
  FETCH_ROOM: "/room/rooms_information/:hotelId",
  FETCH_ALL_HOTEL: "/hotel/get-all-hotel",
  FETCH_ROOM_DETAIL: "/room/rooms_detail/:roomId",

  //FEEDBACK:
  FETCH_FEEDBACK_BY_HOTELID: "feedback/get-feedback-hotel/:hotelId",
  FETCH_USER_FEEDBACKS: "feedback/my-feedbacks",
  UPDATE_FEEDBACK: "feedback/update-feedback/:feedbackId",
  DELETE_FEEDBACK: "feedback/delete-feedback/:feedbackId",
    CREATE_FEEDBACK:"feedback/create-feedback",
    ////ESERVATIONS
  FETCH_USER_RESERVATIONS: "reservations/get-reservation",
  FETCH_RESERVATION_DETAIL:"reservations/reservations-detail/:id",

  UPDATE_RESERVATION:"reservations/update-reservations/:id"
};

export default ApiConstants;
