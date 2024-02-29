/* eslint-disable react/prop-types */
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePage } from "../../redux/slices/UiSlice";
import { useTheme } from "@mui/material/styles";
const ProfileMenu = () => {
  const dispatch = useDispatch();
  const profilePage = useSelector((state) => state.ui.profilePage);
  const theme=useTheme();
  return (
   
      <Tabs value={profilePage} centered  textColor={theme.palette.mode === 'dark' ? 'inherit' : 'primary'}
      sx={{
        position: "sticky",
        top: "0",
        left: "0",
      }}>
      
        <Tab
          value={"posts"}
          label="Fikirler"
          onClick={() => dispatch(setProfilePage("posts"))}
        />
        <Tab
          value={"project"}
          label="Projeler"
          onClick={() => dispatch(setProfilePage("project"))}
        />
        <Tab
          value={"follow"}
          label="Takip"
          onClick={() => dispatch(setProfilePage("follow"))}
        />
      </Tabs>

  );
};

export default ProfileMenu;
