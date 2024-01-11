import "./scss/home.scss";
import ListPost from "../post/ListPost";
import NewPost from "../post/NewPost";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../redux/actions/PostActions";
import { setFilter } from "../../redux/slices/FilterSlice";


const Home = () => {
  const isLogin=useSelector((state) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const filterName=useSelector((state)=>state.filterPosts.filterName);

useEffect(() => {
  //bana özel =benim seçtiğim hashtaglerin postları 
  //tümü kısmındada benim takip ettiğim kişilerin postları
  const userId = filterName === "privateme" ? 4 : null;
  const filter={userId};
  
  dispatch(getPosts(filter));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [filterName]);

  return (
    <div id="home-container">
      <Tabs value={filterName} id="tabs" centered textColor="white">
        <Tab value={"all"} label="Tümü" onClick={()=>dispatch(setFilter("all"))} />
        <Tab value={"privateme"} label="Bana Özel" onClick={()=>dispatch(setFilter("privateme"))}/>
      </Tabs>
     {isLogin&& <NewPost />}
      <ListPost />
    </div>
  );
};

export default Home;
