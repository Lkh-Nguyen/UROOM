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
    case AuthActions.REGISTER_SUCCESS:
      return {
        ...state,
        Auth: {
          ...action.payload?.user,
          isAuthenticated: true,
        },
      };
    case AuthActions.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        Auth: {
          ...action.payload?.user,
          isAuthenticated: true,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
