import axios from "axios";
import { setFollowers, setFollowing } from "../slices/UserSlice";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getFollowers = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/followers/${username}`
    );
    dispatch(setFollowers(response.data));
  } catch (error) {
    console.log(error);
  }
};
const getFollowing = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/following/${username}`
    );
    dispatch(setFollowing(response.data));
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getFollowing, getFollowers, getUser };
