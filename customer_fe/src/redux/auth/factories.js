import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  login: (data) => {
    return api.post(ApiConstants.LOGIN_CUSTOMER, data);
  },
  update_profile: (data) => {
    return api.post(ApiConstants.UPDATE_PROFILE, data);
  },
  change_password: (data) => {
    return api.post(ApiConstants.CHANGE_PASSWORD, data);
  },
  update_avatar: (formData) => {
    return api.put(ApiConstants.UPDATE_AVATAR, formData);
  },

  remove_favorite_hotel: (hotelId) => {
    return api.post(ApiConstants.REMOVE_FAVORITE_HOTELS, { hotelId });
  },

  add_favorite_hotel: (hotelId) => {
    return api.post(ApiConstants.ADD_FAVORITE_HOTELS, { hotelId });
  },
};
export default Factories;
