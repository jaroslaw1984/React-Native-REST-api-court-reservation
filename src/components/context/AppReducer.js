import { SEARCH_USERS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        // get users form html api
        users: action.payload,
        // do not show loading icon
        isLoading: false,
        // set the index
        index: 0,
        // clear rating if will be new search
        rating: 0,
      };
    default:
      return state;
  }
};
