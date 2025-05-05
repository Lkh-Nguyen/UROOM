import FeedbackActions from "./actions";

const initialState = {
  feedbacks: [],
  error: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FeedbackActions.FETCH_USER_FEEDBACKS_SUCCESS:
      return {
        ...state,
        feedbacks: action.payload,
      };

    case FeedbackActions.UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: state.feedbacks.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        ),
      };

    case FeedbackActions.DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: state.feedbacks.filter((fb) => fb._id !== action.payload),
      };
    case FeedbackActions.CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: [action.payload, ...state.feedbacks], 
      };
    default:
      return state;
  }
};

export default feedbackReducer;
