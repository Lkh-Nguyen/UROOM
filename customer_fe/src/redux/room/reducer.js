import RoomActions from "./actions";

const initialState = {
  rooms: null,
  error: null,
};

const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoomActions.FETCH_ROOM_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        error: null, 
      };   
    default:
      return state;
  }
};

export default RoomReducer;
