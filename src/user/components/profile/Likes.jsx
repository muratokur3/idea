import { useEffect } from "react"
import ListPost from "../post/ListPost"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../redux/actions/PostActions";
import { setFilterProfileLikesPosts } from "../../redux/slices/FilterSlice";

const Likes = () => {
  const dispatch = useDispatch();
  const filterProfileLikesPosts=useSelector((state)=>state.filterPosts.filterProfileLikesPosts);
  
  useEffect(() => {
    dispatch(setFilterProfileLikesPosts(localStorage.getItem("userId")));
    dispatch(getPosts({id:filterProfileLikesPosts}))
  }, [])
  return (
    <ListPost/>
  )
}

export default Likes
