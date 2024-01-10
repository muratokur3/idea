import axios from 'axios';
import { addPost, setPost } from '../store/PostSlice';

// const url=process.env.IDEA_APP_API_URL;

const getPosts = () => async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3005/posts");
      dispatch(setPost(response.data));
    } catch (error) {
      console.error("Veri gelirken hata oluştu:", error);
    }
  };

  const createPost = (post) => async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3005/posts", post);
      dispatch(getPosts());
      addPost(response.data);
    } catch (error) {
      console.error("Veri gelirken hata oluştu:", error);
    }
  }

export { getPosts, createPost};