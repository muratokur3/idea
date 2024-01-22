import axios from "axios";
import {
  addPost,
  setExplore,
  setFavorites,
  setHome,
  setPrivateMe,
  setProfile,
  setProfileLikes,
} from "../slices/PostSlice";

const urlApi = import.meta.env.VITE_API_BASE_URL;

const getHomePosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts`, {
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
    const response = await axios.get("http://localhost:3005/posts");
    dispatch(setPrivateMe(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExplorePosts = (filter) => async (dispatch) => {
  try {
   const response = await axios.get("http://localhost:3005/posts", {
  params: { ...filter  },
});
dispatch(setExplore(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavoritesPosts = (favorite) => async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3005/posts", {
        params: { id: favorite },
      });
      dispatch(setFavorites(response.data[0]));
    } catch (error) {
      console.error("Veri gelirken hata oluştu:", error);
    }
  
};

const getProfilePosts = (userId) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts", {
      params: { userId },
    });
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getProfileLikesPosts = (like) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts", {
      params: {
        id: like,
      },
    });
    dispatch(setProfileLikes(response.data[0]));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
}

const createPost = (post) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3005/posts", post);
    dispatch(addPost(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

export {
  getHomePosts,
  getPrivateMePosts,
  getExplorePosts,
  getFavoritesPosts,
  getProfilePosts,
  getProfileLikesPosts,
  createPost,
};
