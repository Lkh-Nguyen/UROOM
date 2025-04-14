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
    case AuthActions.SET_USER:
      return {
        Auth: {
          ...action.payload?.user,
        },
      };
    case AuthActions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          ...action.payload?.user,
        },
      };
    case AuthActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
        },
      };

    case AuthActions.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          image: action.payload.image,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
