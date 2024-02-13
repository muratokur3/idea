import { getProfilePosts } from "../redux/actions/PostActions";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/menu/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Project from "../components/profile/project";
import ListPost from "../components/post/ListPost";
import Follow from "../components/profile/Follow";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import "./profile.scss";
import NewProjectPage from "../Modals/NewProject";

import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { getProfile } from "../redux/actions/ProfileAction";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const profileData = useSelector((state) => state.profile);
  const profilePage = useSelector((state) => state.ui.profilePage);
  const newProjectPage = useSelector((state) => state.ui.newProjectPage);
  const profilePostsData = useSelector((state) => state.posts.profilePosts);
  useEffect(
    () => {
      dispatch(getProfile(username));
    },
    [username, dispatch]
  );
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
     {/* <Paper
          component="form"
          sx={{
            background: "none",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>

          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Kişi konu veya hashtag ara"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper> */}
      {newProjectPage&&<NewProjectPage />}
      <ProfileHeader profileData={profileData} />
      <ProfileMenu />
      <Box sx={
        {
          margin: "20px",
          borderRadius: "10px",
          
        }
      }>

      {page()}
      </Box>
    </div>
  );
};

export default ProfileLayout;
