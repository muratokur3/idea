import ListPost from "../components/post/ListPost";
import NewPost from "../components/post/NewPost";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/FilterSlice";
import "./home.scss";
import { Box, Tab, Tabs } from "@mui/material";
import { getHomeData, getPrivateMeData, } from "../redux/actions/PostActions";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const loginedUserId = useSelector((state) => state.authentication.user._id);
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);
const theme=useTheme();
  useEffect(() => {
    homeData.posts.length === 0 && dispatch(getHomeData(homeData.pagination,loginedUserId));
    filterName !== "all" && privateMeData.posts.length === 0 && dispatch(getPrivateMeData(privateMeData.pagination,loginedUserId));
  }
    , []);


  return (
    <Box>
      {isLogin && (
        <Tabs sx={{
          backgroundColor:"secondary.main",
        }} value={filterName} centered textColor="prmary.main" indicatorColor="primary" 
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
      {filterName === "all" && <ListPost data={homeData} getPosts={() => dispatch(getHomeData(homeData.pagination,loginedUserId))} />}
      {filterName !== "all" && <ListPost data={privateMeData} getPosts={() => dispatch(getPrivateMeData(privateMeData.pagination,loginedUserId))} />}


    </Box>
  );
};

export default Home;
