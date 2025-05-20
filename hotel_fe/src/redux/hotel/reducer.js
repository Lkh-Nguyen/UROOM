import HotelActions from "./actions";

const initialState = {
  hotel: null,
  hotelDetail: null,
  error: null,
  top3Hotels: [],
};

const favoriteHotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HotelActions.FETCH_FAVORITE_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      };
    case HotelActions.FETCH_HOTEL_BY_OWNER_ID_SUCCESS:
      console.log(action.payload.hotels);
      return {
        ...state,
        hotel: action.payload.hotels[0],
      };
    case HotelActions.FETCH_All_HOTEL_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      };
    case HotelActions.FETCH_TOP3_HOTEL_SUCCESS:
      return {
        ...state,
        top3Hotels: action.payload,
      };

    default:
      return state;
  }
};

export default favoriteHotelReducer;
