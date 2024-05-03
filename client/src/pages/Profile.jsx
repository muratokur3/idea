import ProfileHeader from "../components/profile/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { getProfile } from "../redux/actions/ProfileAction";
import ProfileMenu from "../components/menu/ProfileMenu";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.profile.user);
  
  useEffect(() => {
    dispatch(getProfile(username));
  }, [username,dispatch]);
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
      {user && <ProfileHeader user={user} />}
      <ProfileMenu />
    </Box>
  );
};

export default ProfileLayout;
