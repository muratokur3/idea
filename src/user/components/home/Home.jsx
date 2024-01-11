import "./scss/home.scss";
import ListPost from "../post/ListPost";
import NewPost from "../post/NewPost";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/FilterSlice";
import { getHomePosts, getPrivateMePosts } from "../../redux/actions/PostActions";
import { useEffect } from "react";

const Home = () => {
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homePosts = useSelector((state) => state.posts.home);
  const privatemePosts = useSelector((state) => state.posts.privateMe);
  useEffect(() => {
    homePosts.length===0 &&dispatch(getHomePosts());
    privatemePosts.length===0 && dispatch(getPrivateMePosts());
  }, []);
  return (
    <div id="home-container">
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
      {isLogin && <NewPost />}
      <ListPost posts={filterName==="all"?homePosts:privatemePosts} />
    </div>
  );
};

export default Home;
