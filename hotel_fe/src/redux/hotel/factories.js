import ApiConstants from "../../adapter/ApiConstants";
import api from "../../libs/api/index";

const Factories = {
  fetch_favorite_hotel: (ids, paramsQuery) => {
    const params = {
      address: "",
      district: "",
      star: "0",
    };
    if (paramsQuery.selectedCity != "" && paramsQuery.selectedCity) {
      params.address = paramsQuery.selectedCity;
    }
    if (paramsQuery.selectedDistrict != "" && paramsQuery.selectedDistrict) {
      params.district = paramsQuery.selectedDistrict;
    }
    if (paramsQuery.selectedStar != "0") {
      params.star = paramsQuery.selectedStar;
    }
    return api.post(ApiConstants.FETCH_FAVORITE_HOTELS, { ids, params });
  },

  fetch_hotels_by_owner_id: (id) => {
    const url = ApiConstants.FETCH_HOTEL_BY_OWNER_ID;
    return api.post(url, { id });
  },

  get_all_hotels: () => {
    return api.get(ApiConstants.FETCH_ALL_HOTEL);
  },
  get_top3_hotels: () => {
    return api.get(ApiConstants.FETCH_TOP3_HOTEL);
  },
};

export default Factories;
