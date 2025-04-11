import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";

const Factories = {
  searchHotel: (query) => {
    const params = {
      address: '',
      checkinDate: '',
      checkoutDate: '',
      numberOfPeople: 0,
    };

    if(query.address){
      params.address= query.address
    }
    if(query.checkoutDate){
      params.checkoutDate= query.checkoutDate
    }
    if(query.checkinDate){
      params.checkinDate= query.checkinDate
    }
    if(query.numberOfPeople){
      params.numberOfPeople= query.numberOfPeople
    }
    return api.get(ApiConstants.SEARCH_HOTEL, {params});
  },
};
export default Factories;
