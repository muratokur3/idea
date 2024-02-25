import { useDispatch, useSelector } from "react-redux";
import {
  getHashtagExploreData,
} from "../../redux/actions/PostActions";
import ListPost from "../post/ListPost";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";
const ExploreLayout = () => {
  const hashtagExploreData = useSelector((state) => state.posts.hashtagExplore);
  const dispatch = useDispatch();
  const { hashtag } = useParams();

  useEffect(() => {
    dispatch(getHashtagExploreData({page:1,hasMore:true}, hashtag));
    
  }, [hashtag,dispatch]);
  return (
    <>
      <Typography
      sx={{
        fontSize: "1.5rem",
        padding: "1rem",
        fontFamily: "roboto",
      }}>#{hashtag}</Typography>
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
