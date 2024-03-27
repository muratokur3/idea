import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListPost from "../post/ListPost";
import { getProfilePosts } from "../../redux/actions/ProfileAction";
import { useEffect } from "react";

const ProfilePosts = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profilePostsData = useSelector((state) => state.profile.profilePosts);

  useEffect(() => {
    dispatch(getProfilePosts({ page: 1, hasMore: true }, username));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListPost
      data={profilePostsData}
      getPosts={() =>
        dispatch(getProfilePosts(profilePostsData.pagination, username))
      }
    />
  );
};

export default ProfilePosts;
