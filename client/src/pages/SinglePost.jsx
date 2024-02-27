import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/post/Post";
import { useSelector } from "react-redux";

const SinglePost = () => {
  const activeUser = useSelector((state) => state.authentication.user);
  const urlApi = import.meta.env.VITE_API_BASE_URL;
  const [post, setPost] = useState(); // Düzeltme burada
  const { username, id } = useParams();
  const getPost = async () => {
    const response = await axios.get(`${urlApi}/api/quest/explore/singlepost/${id}`);
    setPost(response.data[0]);
  };

  useEffect(() => {
    getPost();
  }, [id, username]);
  return <div>
    
    {post? <Post post={post} activeUser={activeUser} />:
    <div>Post not found</div>}
    </div>;
};

export default SinglePost;