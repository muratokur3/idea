import ListPost from "../components/post/ListPost";
import NewPost from "../components/post/NewPost";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/FilterSlice";
import "./home.scss";
import { Tab, Tabs } from "@mui/material";
import { getHomeData, getPrivateMeData, } from "../redux/actions/PostActions";
import { useEffect } from "react";

const Home = () => {
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);

  useEffect(() => {
    homeData.posts.length === 0 && dispatch(getHomeData(homeData.pagination));
    filterName !== "all" && privateMeData.posts.length === 0 && dispatch(getPrivateMeData(privateMeData.pagination));
  }
    , []);


  return (
    <div id="home-container">
      {isLogin && (
        <Tabs value={filterName} id="tabs" centered textColor="white">
          <Tab
            value={"all"}
            label="Tümü"
            onClick={() => dispatch(setFilter("all"))}
          />
          <Tab
            value={"privateme"}
            label="Bana Özel"
            onClick={() => dispatch(setFilter("privateme"))}
          />
        </Tabs>
      )}
      {isLogin && <NewPost />}
      {filterName === "all" && <ListPost data={homeData} getPosts={() => dispatch(getHomeData(homeData.pagination))} />}
      {filterName !== "all" && <ListPost data={privateMeData} getPosts={() => dispatch(getPrivateMeData(privateMeData.pagination))} />}


    </div>
  );
};

export default Home;
