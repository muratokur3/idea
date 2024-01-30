import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions/ProfileAction";
import ProfileMenu from "../components/menu/ProfileMenu";
import Follow from "../components/profile/Follow";
import Detail from "../components/profile/Detail";
import Project from "../components/profile/Project";
import UserDetail from "../components/profile/UserDetail";

import './profile.scss'
import ListPost from "../components/post/ListPost";
const ProfileLayout = () => {
  const { username } = useParams();
  const profile = useSelector((state) => state.profile);
  const profilePage = useSelector((state) => state.ui.profilePage);
  const dispatch = useDispatch();
  const posts=useSelector((state) => state.posts);
  const page = () => {

    switch (profilePage) {
      case "posts":
        return <ListPost posts={posts.profilePosts}/>;
      case "like":
        return <ListPost posts={posts.profileLikes}/>;
      case "follow":
        return <Follow />;
      case "detail":
        return <Detail />;
      case "project":
        return <Project />;
      default:
        return <Outlet />;
    }
  };


  useEffect(
    () => {
     dispatch(getProfile(username));
    //  dispatch(getProfilePosts(username));
    //  dispatch(getProfileLikesPosts(username));
    },
    [username]
  );
  return (
    <div id="profile-layout-container">
      <UserDetail user={profile} />
      <ProfileMenu />
      {page()}
    </div>
  );
};

export default ProfileLayout;
