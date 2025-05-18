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

  fetch_hotels_by_ids: (ids) => {
    const url = ApiConstants.FETCH_HOTELS_BY_IDS;
    return api.post(url, { ids });
  },

  get_all_hotels: () => {
    return api.get(ApiConstants.FETCH_ALL_HOTEL);
  },
  get_top3_hotels: () => {
    return api.get(ApiConstants.FETCH_TOP3_HOTEL);
  },
};

export default Factories;
