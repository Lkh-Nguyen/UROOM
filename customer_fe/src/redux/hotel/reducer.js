import HotelActions from "./actions";

const initialState = {
  hotels: [],
  hotelDetail: null,
  error: null,
};

const favoriteHotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HotelActions.FETCH_FAVORITE_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      };
    case HotelActions.REMOVE_FAVORITE_HOTEL_SUCCESS:
      return {
        ...state,
        hotels: state.hotels.filter((hotel) => hotel._id !== action.payload),
      };
      case HotelActions.FETCH_DETAIL_HOTEL_SUCCESS:
        return {
          ...state,
          hotelDetail: action.payload,
        };
        case HotelActions.FETCH_All_HOTEL_SUCCESS: 
        return {
          ...state,
          hotels: action.payload,
        };      
    default:
      return state;
  }
};

export default favoriteHotelReducer;
