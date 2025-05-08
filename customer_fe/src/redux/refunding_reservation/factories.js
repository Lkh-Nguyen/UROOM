import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";


const Factories = {

  create_refunding_reservation: (idReservation, refundAmount) => {
    const url = `${ApiConstants.CREATE_REFUNDING_RESERVATION}`
    return api.post(url, {idReservation, refundAmount});
  },
  
  get_refunding_reservation_byUserId: () => {
    const url = `${ApiConstants.GET_REFUNDING_RESERVATION_BYUSERID}`
    return api.get(url);
  },
};

export default Factories;
