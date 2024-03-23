import axios from '../../../axiosConfig';
import { setSearch } from "../slices/SearchSlice";

const getSearchResults = (searchReq) => async (dispatch) => {
  const response = await axios.get(`search/${searchReq.text}`, {
    params: {
      searchFilter: searchReq.searchFilter,
    }
    
  });
  if (response.status === 200) {
    
    dispatch(setSearch(response.data));
  }
};

export { getSearchResults };
