import axios from "axios";
import { addPost, setPost } from "../slices/PostSlice";

// const url=process.env.IDEA_APP_API_URL;

const getPosts = (filter) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/posts", {
    params:{
      ...filter
    }
    });
    dispatch(setPost(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const createPost = (post) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3005/posts", post);
    dispatch(addPost(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

export { getPosts, createPost };
