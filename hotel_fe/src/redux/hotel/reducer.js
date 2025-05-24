import HotelActions from "./actions";

const initialState = {
  hotel: null,
  hotelDetail: null,
  error: null,
  top3Hotels: [],
  loading: false,
  data: null,
  error: null,
};

const favoriteHotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HotelActions.FETCH_FAVORITE_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      };
    case HotelActions.FETCH_OWNER_HOTEL_SUCCESS:
      return {
        ...state,
        hotel: action.payload.hotels[0],
        data: action.payload,
        loading: false,
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
    case HotelActions.UPDATE_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
      case HotelActions.UPDATE_HOTEL_SERVICE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            services: state.data.services.map((service) =>
              service._id === action.payload._id
                ? { ...service, statusActive: action.payload.statusActive }
                : service
            ),
          },
        };
        case HotelActions.CREATE_HOTEL_SERVICE_SUCCESS:
          return {
            ...state,
            loading: false,
            data: {
              ...state.data,
           
              services: [...(state.data?.services || []), action.payload],
            },
            error: null,
          };

    default:
      return state;
  }
};

export default favoriteHotelReducer;
