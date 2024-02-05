import { useEffect } from "react";
import ListPost from "../components/post/ListPost"
import {  useDispatch, useSelector } from "react-redux"
import { getProfileLikesPosts } from "../redux/actions/PostActions";

const LikeMe = () => {
  const username  = localStorage.getItem("username");
  const ProfileLikesData = useSelector((state) => state.posts.profileLikes);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getProfileLikesPosts({ page: 1, hasMore: true }, username));
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ListPost
            data={ProfileLikesData}
            getPosts={() =>
              dispatch(
                getProfileLikesPosts(ProfileLikesData.pagination, username)
              )
            }
          />
  )
}

export default LikeMe
