import { getProfilePosts } from "../redux/actions/PostActions";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/menu/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Project from "../components/project";
import ListPost from "../components/post/ListPost";
import Follow from "../components/profile/Follow";
import { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { getFavorites, getProfile } from "../redux/actions/ProfileAction";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const profileData = useSelector((state) => state.profile);
  const profilePage = useSelector((state) => state.ui.profilePage);
  const profilePostsData = useSelector((state) => state.posts.profilePosts);
  const favoriteData = useSelector((state) => state.profile.favorites);

  useEffect(() => {
    dispatch(getProfile(username));
    dispatch(getFavorites({ page: 1, hasMore: true }, username));
  }, [username, dispatch]);
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
      case "project":
        return <Project />;
      case "favorite":
        return (
          <ListPost
            data={favoriteData}
            getPosts={() =>
              dispatch(getFavorites(favoriteData?.pagination, username))
            }
          />
        );
      case "follow":
        return <Follow />;
      default:
        return <Outlet />;
    }
  };

  useEffect(() => {
    dispatch(getProfilePosts({ page: 1, hasMore: true }, username));
  }, [username]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {profileData.user && <ProfileHeader profileData={profileData} />}
      <ProfileMenu />
      <Box
        sx={{
          margin: "20px",
          borderRadius: "10px",
        }}
      >
        {page()}
      </Box>
    </Box>
  );
};

export default ProfileLayout;
