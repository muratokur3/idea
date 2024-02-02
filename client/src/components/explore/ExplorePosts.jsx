import { useDispatch, useSelector } from "react-redux";
import {
  getExploreData,
  getHashtagExploreData,
} from "../../redux/actions/PostActions";
import ListPost from "../post/ListPost";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const ExploreLayout = () => {
  const hashtagExploreData = useSelector((state) => state.posts.hashtagExplore);
  const dispatch = useDispatch();
  const { hashtag } = useParams();

  useEffect(() => {
    console.log("bu sayfa render edildi");
    dispatch(getHashtagExploreData({page:1,hasMore:true}, hashtag));
    
  }, []);
  return (
    <>
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
