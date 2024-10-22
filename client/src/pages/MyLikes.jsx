import { useEffect } from "react";
import ListPost from "../components/post/ListPost"
import {  useDispatch, useSelector } from "react-redux"
import { getProfileLikesPosts } from "../redux/actions/PostActions";

const MyLikes = () => {
  const ProfileLikesData = useSelector((state) => state.posts.myLikes);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getProfileLikesPosts({ page: 1, hasMore: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ListPost
    sx={{
      width: "100%",
    }}
            data={ProfileLikesData}
            getPosts={() =>
              dispatch(
                getProfileLikesPosts(ProfileLikesData.pagination)
              )
            }
          />
  )
}

export default MyLikes
