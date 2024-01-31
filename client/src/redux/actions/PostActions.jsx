import axios from "axios";
import {
  setHome,
  setPrivateMe,
  setExplore,
  setFavorites,
  setProfilePosts,
  setProfileLikes,
} from "../slices/PostSlice";

const urlApi = import.meta.env.VITE_API_BASE_URL;
const userId = localStorage.getItem("userId");

const getHomeData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/timeline/${userId}`, {
      params: {
        page: pagination.page,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(
      setHome({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getPrivateMeData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/privateMe/${userId}`,
      {
        params: {
          page: pagination.page,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(
      setPrivateMe({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExploreData = (pagination,hashtag) => async (dispatch) => {
  try {

    const response = await axios.get(`${urlApi}/api/posts/explore`, {
     params: {
       page: pagination.page,
        hashtag: hashtag,
      },
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setExplore({posts: await response.data.posts,pagination: await response.data.pagination,}));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavoritesPosts = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/favorite/${username}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(setFavorites(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getProfilePosts = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/profile/${username}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(setProfilePosts(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getProfileLikesPosts = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/likes/${username}`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setProfileLikes(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const createPost = (post) => async () => {
  try {
    await axios.post(`${urlApi}/api/posts`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

export {
  getHomeData,
  getPrivateMeData,
  getExploreData,
  getFavoritesPosts,
  getProfilePosts,
  getProfileLikesPosts,
  createPost,
};
