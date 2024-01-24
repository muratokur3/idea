import axios from "axios";
import { setHashtags } from "../slices/HashtagSlice";

const getHashtags = () => async (dispatch) => {
  const urlApi = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await axios.get(`${urlApi}/api/hashtags`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setHashtags(response.data));
  } catch (err) {
    console.log(err);
  }
};

export { getHashtags };
