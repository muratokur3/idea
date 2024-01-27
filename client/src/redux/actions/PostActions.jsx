import axios from "axios";
import {
  setExplore,
  setFavorites,
  setProfilePosts,
  setHome,
  setPrivateMe,
  setProfileLikes,
} from "../slices/PostSlice";

const urlApi = import.meta.env.VITE_API_BASE_URL;
const userId = localStorage.getItem("userId");
const getHomePosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/timeline/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setHome(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getPrivateMePosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/privateMe/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setPrivateMe(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExplorePosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/explore`, {
      headers: {"Content-Type": "application/json"},
    });
    dispatch(setExplore(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExploreHashtagPosts = (hashtag) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/explore/${hashtag}`, {
      headers: {"Content-Type": "application/json"},
    });
    dispatch(setExplore(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavoritesPosts = (username) => async (dispatch) => {
    try {
      const response = await axios.get(`${urlApi}/api/posts/favorite/${username}`, {
        headers: {"Content-Type": "application/json"},
      });
      dispatch(setFavorites(response.data));
    } catch (error) {
      console.error("Veri gelirken hata oluştu:", error);
    }
  
};

const getProfilePosts = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/profile/${username}`, {
      headers: {"Content-Type": "application/json"},
    });
    dispatch(setProfilePosts(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getProfileLikesPosts = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/likes/${username}`, {
      headers: {"Content-Type": "application/json"},
    });
    dispatch(setProfileLikes(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
}

const createPost = (post) => async () => {
  try {
    await axios.post(`${urlApi}/api/posts`, post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

export {
  getHomePosts,
  getPrivateMePosts,
  getExplorePosts,
  getExploreHashtagPosts,
  getFavoritesPosts,
  getProfilePosts,
  getProfileLikesPosts,
  createPost,
};
