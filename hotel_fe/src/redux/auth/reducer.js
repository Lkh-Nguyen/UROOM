import AuthActions from "./actions";

const initState = {
  Auth: {
    _id: -1,
  },
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        Auth: {
          ...action.payload?.user,
          isAuthenticated: true,
        },
      };
    case AuthActions.LOGOUT:
      return {
        Auth: {
          _id: -1,
        },
      };

    default:
      return state;
  }
};

export default Reducer;
