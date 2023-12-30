import "./scss/list-post.scss";
import Post from "./Post.jsx";
import { useSelector } from "react-redux";

const ListPost = () => {
const ideas = useSelector((state) => state.ideas);

  return (
    <div>
      {
      ideas.map((post,index) => (
        <Post key={index} post={post} />
      )).reverse()
      }
    </div>
  );
};

export default ListPost;
