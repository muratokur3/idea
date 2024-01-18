import { useDispatch, useSelector } from "react-redux";
import ListPost from "../components/post/ListPost";
import { useEffect } from "react";
import { getFavoritesPosts } from "../redux/actions/PostActions";
const Favorite = () => {
const favoritePosts = useSelector((state) => state.posts.favorites);
const favorites = useSelector((state) => state.authentication.user.favorites);
const dispatch=useDispatch();
  useEffect(() => {
 favorites&& favorites.map(async(favorite) => {
    favoritePosts.length===0&& dispatch(getFavoritesPosts(favorite));
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
return (
    <ListPost posts={favoritePosts}/>
  )
}

export default Favorite