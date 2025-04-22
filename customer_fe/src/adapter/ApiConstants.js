const ApiConstants = {

  //AUTH:
  LOGIN_CUSTOMER: '/auth/login_customer',
  UPDATE_PROFILE:'/auth/updateProfile_customer',
  CHANGE_PASSWORD:'/auth/changePassword_customer',
  UPDATE_AVATAR:'/auth/update_avatar',

  //SEARCH:
  SEARCH_HOTEL: '/search',
  FETCH_FAVORITE_HOTELS:'/hotel/get-hotel-byId',
  REMOVE_FAVORITE_HOTELS:'/hotel/remove-favorite',
  ADD_FAVORITE_HOTELS:'/hotel/add-favorite',

  FETCH_DETAIL_HOTELS: '/hotel/hotel_detail/:hotelId',
  FETCH_ROOM: '/room/rooms_information/:hotelId',
  FETCH_ALL_HOTEL:'/hotel/get-all-hotel',


  //FEEDBACK:
  FETCH_FEEDBACK_BY_HOTELID: 'feedback/get-feedback-hotel/:hotelId',
  LIKE_FEEDBACK: 'feedback/like',
  DISLIKE_FEEDBACK: 'feedback/dislike',

  //CREATE_BOOKING:
  CREATE_BOOKING: 'payment/create-booking',
  CANCEL_PAYMENT: 'payment/cancel-payment',
  ACCEPT_PAYMENT: 'payment/accept-payment',

  //RESERVATION:
  FETCH_DETAIL_RESERVATION: '/reservation/detail',

};

export default ApiConstants;