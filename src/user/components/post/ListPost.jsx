import "./scss/list-post.scss";
import Post from "./Post.jsx";
import { useSelector } from "react-redux";

const ListPost = () => {
  const posts = useSelector((state) => state.posts);

 
  return (
    <div>
      {posts.map((post, index) => <Post key={index} post={post} />).reverse()}
    </div>
  );
};

export default ListPost;
