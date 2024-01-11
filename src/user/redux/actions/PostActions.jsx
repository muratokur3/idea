import axios from "axios";
import { addPost, setExplore, setHome, setProfile } from "../slices/PostSlice";

// const url=process.env.IDEA_APP_API_URL;

const getHomePosts = (filter) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts", {
    params:{
      ...filter
    }
    });
    dispatch(setHome(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExplorePosts = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts",{params:{userId:4}});
    dispatch(setExplore(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
}

const getProfilePosts = (userId) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts",{params:{userId}});
    dispatch(setProfile(response.data));
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

export { getHomePosts,getExplorePosts, createPost,getProfilePosts };
