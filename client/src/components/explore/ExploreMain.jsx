import ListPost from "../post/ListPost";
import HashtagCardList from "../hashtag/HashtagCardList";
import { getExploreData } from "../../redux/actions/PostActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const ExploreMain = () => {
  const dispatch = useDispatch();
  const exploreData = useSelector((state) => state.posts.explore);
  useEffect(() => {
   dispatch(getExploreData({page:1,hasMore:true}));
  }
  , []);
  return (
    <div>
      <HashtagCardList />
      <ListPost
        data={exploreData}
        getPosts={() => dispatch(getExploreData(exploreData.pagination))}
      />
    </div>
  );
};

export default ExploreMain;
