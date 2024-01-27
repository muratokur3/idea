import axios from "axios";
import { setProfile } from "../slices/ProfileSlice";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const getProfile = (Username) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${Username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setProfile(response.data));
  } catch (error) {
    console.log(error);
  }
};
const followUser = (followerId, followingId) => async () => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/follow`,
      {
        followerId,
        followingId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { getProfile, followUser };
