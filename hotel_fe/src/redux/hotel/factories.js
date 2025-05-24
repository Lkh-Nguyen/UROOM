import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  fetchOwnerHotel: () => {
    return api.get(ApiConstants.FETCH_OWNER_HOTEL);
  },
  updateHotel: (hotelId, updateData) => {
    return api.put(`${ApiConstants.UPDATE_HOTEL}/${hotelId}`, updateData);
  },
  updateHotelServiceStatus: (hotelId, statusActive, serviceId) => {
    const url = ApiConstants.UPDATE_HOTEL_SERVICE_STATUS.replace(":hotelId", hotelId);
    return api.put(url, {statusActive: statusActive.statusActive, serviceId} );
  },
  createHotelService: (serviceData) => {
    return api.post(ApiConstants.CREATE_HOTEL_SERVICE, serviceData);
  },
};

export default Factories;
