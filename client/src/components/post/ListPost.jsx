import "./scss/list-post.scss";
import Post from "./Post.jsx";

const ListPost = ({posts}) => {
  return (
    <>
      {posts.map((post, index) => <Post key={index} post={post} />).reverse()}
    </>
  );
};

export default ListPost;