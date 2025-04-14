import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";


const Factories = {
  fetch_favorite_hotel: (ids) => {
    return api.post(ApiConstants.FETCH_FAVORITE_HOTELS, { ids });
  },
  remove_favorite_hotel: (hotelId) => {
    return api.post(ApiConstants.REMOVE_FAVORITE_HOTELS, { hotelId });
  },
  fetch_detail_hotel: (hotelId) => {
    const url = ApiConstants.FETCH_DETAIL_HOTELS.replace(":hotelId", hotelId);
    return api.get(url);
  }
  
  
};

export default Factories;
