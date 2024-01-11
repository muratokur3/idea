import "./scss/home.scss";
import ListPost from "../post/ListPost";
import NewPost from "../post/NewPost";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/FilterSlice";

const Home = () => {
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filterPosts.filterName);
  const posts = useSelector((state) => state.posts.home);

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
      <ListPost posts={posts} />
    </div>
  );
};

export default Home;
