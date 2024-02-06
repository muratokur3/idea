import axios from "axios";
import { setProfile } from "../slices/ProfileSlice";
import { ubdateUserFollow } from "../slices/UserSlice";
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

const follow = (user, followerId, followingId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/follow/${followerId}/${followingId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newUser = {
      ...user,
      followers: new Set(user.followers).has(followingId)
        ? user.followers
        : [...user.followers, followingId],
    };

    if (response.status === 200) {
      console.log("Takip işlemi başarılı");
      dispatch(ubdateUserFollow(newUser));
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = (user, followerId, followingId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/unfollow/${followerId}/${followingId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newUser = {
      ...user,
      followers: new Set(user.followers).has(followingId)
        ? user.followers.filter((id) => id !== followingId)
        : user.followers,
    };

    if (response.status === 200) {
      console.log("Takip bırakma işlemi başarılı");
      dispatch(ubdateUserFollow(newUser));
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { getProfile, follow, unfollow };
