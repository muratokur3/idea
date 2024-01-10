import "./scss/list-post.scss";
import Post from "./Post.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../../actions/PostActions.jsx";

const ListPost = () => {
const posts = useSelector((state) => state.posts);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(getPosts());

}
, []);
  return (
    <div>
      {
      posts.map((post,index) => (
        <Post key={index} post={post} />
      )).reverse()
      }
    </div>
  );
};

export default ListPost;
