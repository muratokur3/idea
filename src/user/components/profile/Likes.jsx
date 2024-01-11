import { useEffect } from "react"
import ListPost from "../post/ListPost"
import { useDispatch } from "react-redux"
import { setFilterProfileLikesPosts } from "../../redux/slices/FilterSlice";

const Likes = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setFilterProfileLikesPosts(localStorage.getItem("userId")));
  }, [])
  return (
    <ListPost/>
  )
}

export default Likes
