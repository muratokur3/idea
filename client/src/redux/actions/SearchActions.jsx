import axios from "axios";
import { setSearch } from "../slices/SearchSlice";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getSearchResults = (searchReq) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/api/search/${searchReq.text}`, {
    params: {
      searchFilter: searchReq.searchFilter,
    },

    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  if (response.status === 200) {
    console.log(response.data);
    dispatch(setSearch(response.data));
  }
};

export { getSearchResults };
