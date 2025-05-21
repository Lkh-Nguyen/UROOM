import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  fetchOwnerHotel: () => {
    return api.get(ApiConstants.FETCH_OWNER_HOTEL);
  },
  updateHotel: (hotelId, updateData) => {
    return api.put(`${ApiConstants.UPDATE_HOTEL}/${hotelId}`, updateData);
  },
};

export default Factories;
