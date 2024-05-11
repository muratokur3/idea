import axios from '../../axiosConfig';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/post/Post";

const SinglePost = () => {
  
  const [post, setPost] = useState(); // Düzeltme burada
  const { username, id } = useParams();
  const getPost = async () => {
    const response = await axios.get(`quest/explore/singlepost/${id}`);
    setPost(response.data[0]);
  };

  useEffect(() => {
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username,id]);
  return <div>
    
    {post? <Post post={post} />:
    <div>Post not found</div>}
    </div>;
};

export default SinglePost;