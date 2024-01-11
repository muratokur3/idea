import { useEffect } from "react";
import ListPost from "../post/ListPost"
import {  useDispatch, useSelector } from "react-redux"
import { getProfileLikesPosts } from "../../redux/actions/PostActions";

const Likes = () => {
  const profileLikesPosts = useSelector((state) => state.posts.profileLikes);
  const likes = useSelector((state) => state.profile.likes);
  const id = useSelector((state) => state.profile.id);
  const dispatch=useDispatch();
  useEffect(() => {
    likes && alert(likes.length);
    id && profileLikesPosts.length===0&& likes&& likes.map((like) => dispatch(getProfileLikesPosts(like)));
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <ListPost posts={profileLikesPosts}/>
  )
}

export default Likes
