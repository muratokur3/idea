import { useDispatch, useSelector } from "react-redux";
import ListPost from "../post/ListPost"
import { useEffect } from "react";
import { setFilterProfilePosts } from "../../redux/slices/FilterSlice";


const ProfileMain = () => {
  const posts = useSelector((state) => state.posts.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilterProfilePosts(localStorage.getItem("userId")));
  }
  , [])
  return (
    <ListPost posts={posts}/>
  )
}

export default ProfileMain