import "./scss/home.scss";
import ListPost from "../post/ListPost";
import NewPost from "../post/NewPost";
import { Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
const Home = () => {
  const isLogin=useSelector((state) => state.authentication.isLogin);

  return (
    <div id="home-container">
      <Tabs id="tabs" centered textColor="white">
        <Tab label="Tümü" />
        <Tab label="Bana Özel" />
      </Tabs>
     {isLogin&& <NewPost />}
      <ListPost />
    </div>
  );
};

export default Home;
