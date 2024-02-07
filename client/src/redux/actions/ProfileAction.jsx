import axios from "axios";
import {
  setFollowers,
  setFollowing,
  setProfile,
  ubdateUserFollow,
} from "../slices/ProfileSlice";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getProfile = (Username) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${Username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/followers/${username}`
    );

    if (response.data) {
      dispatch(setFollowers(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/following/${username}`
    );
    if (response.data) {
      dispatch(setFollowing(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const follow = (followerId, followingId, user) => async (dispatch) => {
  console.log(user);
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/follow/${followerId}/${followingId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Takip işlemi başarılı");

      const newUser = {
        ...user,
        followers: new Set(user.followers).has(followerId)
          ? user.followers
          : [...user.followers, followerId],
      };
      dispatch(
        ubdateUserFollow(newUser)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = (followerId, followingId, user) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/unfollow/${followerId}/${followingId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Takip bırakma işlemi başarılı");
      const newUser = {
        ...user,
        followers: new Set(user.followers).has(followerId)
          ? user.followers.filter((id) => id !== followerId)
          : user.followers,
      };
      dispatch(
        ubdateUserFollow(newUser)
      );
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { getProfile, getFollowers, getFollowing, follow, unfollow };
