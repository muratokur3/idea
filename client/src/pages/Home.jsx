import ListPost from "../components/post/ListPost";
import NewPost from "../components/post/NewPost";
import { useDispatch, useSelector } from "react-redux";

import { getHomeData, getHomeQuestData, getPrivateMeData } from "../redux/actions/PostActions";
import { useEffect } from "react";
import { Box } from "@mui/material";
import HomeTabs from "../components/actions/HomeTabs";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.session && state.session.authenticated);
  const loginedUserId = useSelector((state) => state.session && state.session.user._id);
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);

  useEffect(() => {
    homeData.posts.length === 0 &&
     (isLoggedIn ? dispatch(getHomeData(homeData.pagination, loginedUserId)) :dispatch(getHomeQuestData(homeData.pagination)));

    filterName !== "all" &&
      privateMeData.posts.length === 0 &&
      dispatch(getPrivateMeData(privateMeData.pagination, loginedUserId));
  }, []);

  return (
    <Box>
     {isLoggedIn && <HomeTabs />}

      {isLoggedIn && filterName === "all" && <NewPost />}

      {filterName === "all" && (
        <ListPost
          data={homeData}
          getPosts={() =>
            dispatch(isLoggedIn?getHomeData(homeData.pagination, loginedUserId):getHomeQuestData(homeData.pagination))
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
