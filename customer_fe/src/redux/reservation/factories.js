import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";


const Factories = {

  fetch_detail_reservation: (reservationId) => {
    const url = `${ApiConstants.FETCH_DETAIL_RESERVATION}/${reservationId}`
    return api.get(url);
  },
  
  get_all_hotels: () => {
    return api.get(ApiConstants.FETCH_ALL_HOTEL);
  }
};

export default Factories;
