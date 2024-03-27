import { useDispatch, useSelector } from "react-redux";
import ListPost from "../components/post/ListPost";
import { useEffect } from "react";
import { getFavoritesPosts } from "../redux/actions/PostActions";
const Favorite = () => {
  const favoriteData = useSelector((state) => state.posts.Myfavorites);
  const username = useSelector((state) => state.session && state.session.user.username);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getFavoritesPosts({page:1,hasMore:true},username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <ListPost data={favoriteData} getPosts={()=>dispatch(getFavoritesPosts(favoriteData?.pagination, username))} />;
};

export default Favorite;
