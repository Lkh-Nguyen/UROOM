import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  fetchUserFeedbacks: (userId) => {
    return api.get(ApiConstants.FETCH_USER_FEEDBACKS.replace(":userId", userId));
  },
  updateFeedback: (feedbackId, data) => {
    return api.put(ApiConstants.UPDATE_FEEDBACK.replace(":feedbackId", feedbackId), data);
  },
  deleteFeedback: (feedbackId) => {
    return api.delete(ApiConstants.DELETE_FEEDBACK.replace(":feedbackId", feedbackId));
  },
  createFeedback: (data) => {
    return api.post(ApiConstants.CREATE_FEEDBACK, data);
  },
};

export default Factories;
