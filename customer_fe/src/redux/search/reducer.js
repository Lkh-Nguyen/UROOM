import { Children } from 'react';
import SearchActions from './actions';

const initState = {
  SearchInformation: {
    address: "",
    checkinDate: "",
    checkoutDate: "",
    adults: 0,
    childrens: 0,
  }
};

const Reducer = (
  state = initState,
  action,
) => {
  switch (action.type) {
    case SearchActions.SAVE_SEARCH:
      return {
        ...state,
        SearchInformation: {
          ...action.payload?.SearchInformation,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
