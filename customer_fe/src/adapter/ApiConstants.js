const ApiConstants = {

  //AUTH:
  LOGIN_CUSTOMER: '/auth/login_customer',
  UPDATE_PROFILE:'/auth/updateProfile_customer',
  CHANGE_PASSWORD:'/auth/changePassword_customer',

  //SEARCH:
  SEARCH_HOTEL: '/search',
  FETCH_FAVORITE_HOTELS:'/hotel/get-hotel-byId',
  REMOVE_FAVORITE_HOTELS:'/hotel/remove-favorite',
  FETCH_DETAIL_HOTELS: '/hotel/hotel_detail/:hotelId',
  FETCH_ROOM: '/room/rooms_information/:hotelId',
};

export default ApiConstants;