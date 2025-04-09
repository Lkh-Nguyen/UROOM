import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";

const Factories = {
  login: (data) => {
    return api.post(ApiConstants.LOGIN_CUSTOMER, data );
  },
};
export default Factories;
