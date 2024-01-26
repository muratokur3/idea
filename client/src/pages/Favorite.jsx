import { useDispatch, useSelector } from "react-redux";
import ListPost from "../components/post/ListPost";
import { useEffect } from "react";
import { getFavoritesPosts } from "../redux/actions/PostActions";
const Favorite = () => {
  const favoritePosts = useSelector((state) => state.posts.favorites);
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  
  useEffect(() => {
     dispatch(getFavoritesPosts(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <ListPost posts={favoritePosts} />;
};

export default Favorite;
