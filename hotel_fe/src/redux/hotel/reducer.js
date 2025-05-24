import HotelActions from "./actions";

const initialState = {
  loading: false,
  data: null,
  error: null,
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
