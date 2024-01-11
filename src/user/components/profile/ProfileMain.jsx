import { useDispatch, useSelector } from "react-redux";
import ListPost from "../post/ListPost"
import { useEffect } from "react";
import { getPosts } from "../../redux/actions/PostActions";
import { setFilterProfilePosts } from "../../redux/slices/FilterSlice";

const ProfileMain = () => {
  const dispatch = useDispatch();
  const filterProfilePosts=useSelector((state)=>state.filterPosts.filterProfilePosts);
  useEffect(() => {
    dispatch(setFilterProfilePosts(localStorage.getItem("userId")));
    dispatch(getPosts({userId:filterProfilePosts}))
  }
  , [])
  return (
    <ListPost/>
  )
}

export default ProfileMain