import ListPost from "../components/post/ListPost";
import NewPost from "../components/post/NewPost";
import { useDispatch, useSelector } from "react-redux";

import { getHomeData, getPrivateMeData } from "../redux/actions/PostActions";
import { useEffect } from "react";
import { Box } from "@mui/material";
import HomeTabs from "../components/actions/HomeTabs";

const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const loginedUserId = useSelector((state) => state.authentication.user._id);
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);

  useEffect(() => {
    homeData.posts.length === 0 &&
      dispatch(getHomeData(homeData.pagination, loginedUserId));
    filterName !== "all" &&
      privateMeData.posts.length === 0 &&
      dispatch(getPrivateMeData(privateMeData.pagination, loginedUserId));
  }, []);

  return (
    <Box>
     <HomeTabs />

      {isLogin && filterName === "all" && <NewPost />}

      {filterName === "all" && (
        <ListPost
          data={homeData}
          getPosts={() =>
            dispatch(getHomeData(homeData.pagination, loginedUserId))
          }
        />
      )}
      {filterName !== "all" && (
        <ListPost
          data={privateMeData}
          getPosts={() =>
            dispatch(getPrivateMeData(privateMeData.pagination, loginedUserId))
          }
        />
      )}
    </Box>
  );
};

export default Home;
