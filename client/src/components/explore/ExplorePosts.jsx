import { useDispatch, useSelector } from "react-redux";
import {
  getHashtagExploreData,
} from "../../redux/actions/PostActions";
import ListPost from "../post/ListPost";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FollowHashtags from "../actions/FollowHashtags";
const ExploreLayout = () => {
  const dispatch = useDispatch();
  const { hashtag } = useParams();
  const hashtagExploreData = useSelector((state) => state.posts.hashtagExplore);
  useEffect(() => {
    dispatch(getHashtagExploreData({page:1,hasMore:true}, hashtag));
  }, [hashtag,dispatch]);
  return (
    <>
     <Box
     sx={{
      display: "flex",
      justifyContent: "space-between",

     }}>
      <Typography
      sx={{
        padding: "1rem",
        color:"primary.main",
        fontSize: "2rem",
      }}>#{hashtag}</Typography>
      {
        <FollowHashtags hashtagName={hashtag} />
      }
      </Box> 

      <ListPost
        data={hashtagExploreData}
        getPosts={() =>
          dispatch(getHashtagExploreData(hashtagExploreData.pagination, hashtag))
        }
      />
    </>
  );
};

export default ExploreLayout;
