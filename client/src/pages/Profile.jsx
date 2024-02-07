import { getProfilePosts } from "../redux/actions/PostActions";
import UserDetail from "../components/profile/UserDetail";
import ProfileMenu from "../components/menu/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Project from "../components/profile/Project";
import ListPost from "../components/post/ListPost";
import Follow from "../components/profile/Follow";
import UserCv from "../components/profile/UserCv";
import { useEffect } from "react";
import "./profile.scss";
import NewProjectPage from "../Modals/NewProject";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const profileData = useSelector((state) => state.profile);
  const profilePage = useSelector((state) => state.ui.profilePage);
  const newProjectPage = useSelector((state) => state.ui.newProjectPage);
  const profilePostsData = useSelector((state) => state.posts.profilePosts);

  const page = () => {
    switch (profilePage) {
      case "posts":
        return (
          <ListPost
            data={profilePostsData}
            getPosts={() =>
              dispatch(getProfilePosts(profilePostsData.pagination, username))
            }
          />
        );
      case "follow":
        return <Follow />;
      case "cv":
        return <UserCv />;
      case "project":
        return <Project />;
      default:
        return <Outlet />;
    }
  };

  useEffect(() => {
    dispatch(getProfilePosts({ page: 1, hasMore: true }, username));
  }, [username]);
  return (
    <div id="profile-layout-container">
      {newProjectPage&&<NewProjectPage />}
      <UserDetail profileData={profileData} />
      <ProfileMenu />
      {page()}
    </div>
  );
};

export default ProfileLayout;
