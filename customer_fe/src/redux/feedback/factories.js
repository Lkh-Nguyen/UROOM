import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";


const Factories = {
  get_feedback_by_hotelId: (hotelId, query) => {
    const params = {
      page: 1,
      limit: 3,
      sort: 0,
      star: 0,
    };
    if(query.page){
      params.page= query.page
    }
    if(query.sort){
      params.sort= query.sort
    }
    if(query.star){
      params.star= query.star
    }
    const url = ApiConstants.FETCH_FEEDBACK_BY_HOTELID.replace(":hotelId", hotelId);
    return api.get(url, {params});  
  },
};

export default Factories;
