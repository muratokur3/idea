
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
        backdropFilter: "blur(3px)",
        position: "sticky",
        top: "0",
        left: "0",
      }}>
      
        <Tab
          value={"posts"}
          label="Fikirler"
          onClick={() => dispatch(setProfilePage("posts"))}
          sx={{ color: theme.palette.primary.main }}
        />
        <Tab
          value={"project"}
          label="Projeler"
          onClick={() => dispatch(setProfilePage("project"))}
          sx={{ color: theme.palette.primary.main }}
        />
         <Tab
          value={"favorite"}
          label="Favoriler"
          onClick={() => dispatch(setProfilePage("favorite"))}
          sx={{ color: theme.palette.primary.main }}
        />
        <Tab
          value={"follow"}
          label="Takip"
          onClick={() => dispatch(setProfilePage("follow"))}
          sx={{ color: theme.palette.primary.main }}
        />
      </Tabs>

  );
};

export default ProfileMenu;
