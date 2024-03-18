import InfinieScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeleton/PostSkeleton.jsx";
import PropTypes from "prop-types";
import Post from "./Post.jsx";
import { Typography } from "@mui/material";

const ListPost = ({ data,getPosts }) => {
  return (
    <InfinieScroll
      dataLength={data.posts.length}
      next={()=>getPosts()}
      hasMore={data.pagination.hasMore}
      loader={<PostSkeleton />}
      endMessage={<Typography color="primary" sx={{textAlign:"center", fontSize:".8rem",marginTop:"20px",}}>{data.posts.length} öğe</Typography>}
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
