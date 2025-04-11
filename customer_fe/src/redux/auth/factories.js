import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";

const Factories = {
  login: (data) => {
    return api.post(ApiConstants.LOGIN_CUSTOMER, data );
  },
  update_profile: (data) => {
    return api.post(ApiConstants.UPDATE_PROFILE, data );
  },
  change_password: (data) => {
    return api.post(ApiConstants.CHANGE_PASSWORD, data );
  },
};
export default Factories;
