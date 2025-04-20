const ApiConstants = {

  //AUTH:
  LOGIN_CUSTOMER: '/auth/login_customer',
  REGISTER_CUSTOMER:'/auth/register_customer',
  UPDATE_PROFILE:'/auth/updateProfile_customer',
  CHANGE_PASSWORD:'/auth/changePassword_customer',
  VERIFY_EMAIL:'/auth/verify-email',
  RESEND_VERIFICATION:'/auth/resend-verification',
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
};

export default ApiConstants;