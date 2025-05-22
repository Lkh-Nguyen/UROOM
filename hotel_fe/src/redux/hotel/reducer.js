import HotelActions from "./actions";

const initialState = {
  loading: false,
  data: null,
};

const favoriteHotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HotelActions.FETCH_OWNER_HOTEL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
      case HotelActions.UPDATE_HOTEL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            ...action.payload,
          },
        };
  
    default:
      return state;
  }
};

export default favoriteHotelReducer;
