import InfinieScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeleton/PostSkeleton.jsx";
import PropTypes from "prop-types";
import Post from "./Post.jsx";
import { Typography, useMediaQuery } from "@mui/material";

const ListPost = ({ data, getPosts }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const posts=data?.posts;
  return (
    <InfinieScroll
      dataLength={data?.posts.length}
      next={() => getPosts()}
      hasMore={data?.pagination.hasMore}
      loader={<PostSkeleton />}
      endMessage={
        <Typography
          color="primary"
          sx={{ textAlign: "center", fontSize: ".8rem", marginTop: "20px" }}
        >
          {data?.posts?.length===0?"Henüz fikir paylaşılmamış":`Toplam ${data?.posts?.length} öğe listelendi`}
        </Typography>
      }
      style={{
        paddingTop:"1rem",
      }}
    >
      {posts.map(post => (
        <Post key={post?._id} post={post} />
      ))}
    </InfinieScroll>
  );
};

export default ListPost;
ListPost.propTypes = {
  data: PropTypes.object,
  getPosts: PropTypes.func,
};
