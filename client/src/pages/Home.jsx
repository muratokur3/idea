import ListPost from "../components/post/ListPost";
import NewPost from "../components/post/NewPost";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/FilterSlice";
import { Box, Tab, Tabs } from "@mui/material";
import { getHomeData, getPrivateMeData } from "../redux/actions/PostActions";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const loginedUserId = useSelector((state) => state.authentication.user._id);
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);
  const theme = useTheme();
  useEffect(() => {
    homeData.posts.length === 0 &&
      dispatch(getHomeData(homeData.pagination, loginedUserId));
    filterName !== "all" &&
      privateMeData.posts.length === 0 &&
      dispatch(getPrivateMeData(privateMeData.pagination, loginedUserId));
  }, []);

  return (
    <Box>
      {isLogin && (
        <Tabs
          value={filterName}
          centered
          textColor={theme.palette.mode === "dark" ? "inherit" : "primary"}
          sx={{
            borderRadius: "10px",
            backdropFilter: "blur(4px)",
            position: "sticky",
            top: "0",
            left: "0",
          }}
        >
          <Tab
            value={"all"}
            label="kişilerim"
            onClick={() => dispatch(setFilter("all"))}
          />
          <Tab
            value={"privateme"}
            label="etiketlerim"
            onClick={() => dispatch(setFilter("privateme"))}
          />
        </Tabs>
      )}

      {<NewPost />}
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
