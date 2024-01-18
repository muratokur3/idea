import { useDispatch, useSelector } from "react-redux";
import ListPost from "../post/ListPost"
import { useEffect } from "react";
import { getProfilePosts } from "../../redux/actions/PostActions";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
  const profilePosts = useSelector((state) => state.posts.profile);
  const id = useSelector((state) => state.profile.id);
  const {username} =useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
     profilePosts.length===0&& dispatch(getProfilePosts(id));
    }
  }, [id,username]);

  return (
    <ListPost posts={profilePosts}/>
  )
}

export default ProfilePosts;