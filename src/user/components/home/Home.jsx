import "./scss/home.scss";
import ListPost from "../post/ListPost";
import NewPost from "../post/NewPost";
import { Tab, Tabs } from "@mui/material";
const Home = () => {
  return (
    <div id="home-container">
      <Tabs id="tabs" centered textColor="white">
        <Tab label="Tümü" />
        <Tab label="Bana Özel" />
      </Tabs>
      <NewPost />
      <ListPost />
    </div>
  );
};

export default Home;
