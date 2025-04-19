import ApiConstants from "../../adapter/ApiConstants"
import api from "../../libs/api/index";


const Factories = {
  fetch_room: (hotelId) => {
    const url = ApiConstants.FETCH_ROOM.replace(":hotelId", hotelId);
    return api.get(url);  
  },
  fetch_room_detail: (roomId) => {
    const url = ApiConstants.FETCH_ROOM_DETAIL.replace(":roomId", roomId);
    console.log("Room Detail API URL:", url);
    return api.get(url);
  },
};

export default Factories;
