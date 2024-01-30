import InfinieScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeleton/PostSkeleton.jsx";
import PropTypes from "prop-types";
import "./scss/list-post.scss";
import Post from "./Post.jsx";
import { useEffect } from "react";

const ListPost = ({ data,getPosts }) => {
useEffect(() => {
  console.log("ListPost",data);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
, []);
 
  return (
    <InfinieScroll
      dataLength={data.posts.length}
      next={()=>getPosts()}
      hasMore={data.pagination.hasMore}
      loader={<PostSkeleton />}
      endMessage={<p style={{textAlign:"center"}}>Gösterilecek başka post yok</p>}
    >
      {data.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </InfinieScroll>
  );
};

export default ListPost;
ListPost.propTypes = {
  data: PropTypes.object,
  getPosts: PropTypes.func,
};
