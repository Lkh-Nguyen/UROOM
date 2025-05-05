import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  fetchUserReservations: (userId) => {
    return api.get(ApiConstants.FETCH_USER_RESERVATIONS.replace(":userId", userId));
  },
  fetchReservationDetail: (reservationId) => {
    return api.get(ApiConstants.FETCH_RESERVATION_DETAIL.replace(":id", reservationId));
  },
};



export default Factories;
