import axios from "axios";
import { setHashtags, setHashtagsExplore } from "../slices/HashtagSlice";

const urlApi = import.meta.env.VITE_API_BASE_URL;

const getHashtags = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/hashtags`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setHashtags(response.data));
  } catch (err) {
    console.log(err);
  }
};
const getHashtagsExplore = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/hashtags/explore`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setHashtagsExplore(response.data));
  } catch (err) {
    console.log(err);
  }
};
export { getHashtags, getHashtagsExplore};
