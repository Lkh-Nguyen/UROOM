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
  FETCH_DETAIL_HOTELS: '/hotel/hotel_detail/:hotelId',
  FETCH_ROOM: '/room/rooms_information/:hotelId',
  FETCH_ALL_HOTEL:'/hotel/get-all-hotel',
};

export default ApiConstants;