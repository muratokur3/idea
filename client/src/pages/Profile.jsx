import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions/ProfileAction";
import ProfileMenu from "../components/menu/ProfileMenu";
import ProfilePosts from "../components/profile/ProfilePosts";
import Likes from "../components/profile/Likes";
import Follow from "../components/profile/Follow";
import Detail from "../components/profile/Detail";
import Project from "../components/profile/Project";
import UserDetail from "../components/profile/UserDetail";

import './profile.scss'
const ProfileLayout = () => {
  const { username } = useParams();
  const profile = useSelector((state) => state.profile);
  const profilePage = useSelector((state) => state.ui.profilePage);
  const dispatch = useDispatch();
  const page = () => {
    switch (profilePage) {
      case "posts":
        return <ProfilePosts />;
      case "like":
        return <Likes />;
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
