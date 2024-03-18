import axios from '../../../axiosConfig';
import { setSearch } from "../slices/SearchSlice";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
