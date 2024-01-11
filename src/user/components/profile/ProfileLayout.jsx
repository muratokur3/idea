import { Outlet, useParams } from "react-router-dom";
import "./scss/profile-layout.scss";
import UserDetail from "./UserDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/ProfileAction";
import ProfileMenu from "../menu/ProfileMenu";
import ProfilePosts from "./ProfilePosts";
import Follow from "../profile/Follow";
import Likes from "../profile/Likes";
import Detail from "../profile/Detail";
import Project from "../profile/Project";
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
