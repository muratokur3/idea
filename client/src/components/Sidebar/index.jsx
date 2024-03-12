import {
  Box,
  Button,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { styled } from "@mui/system";
import logoImg from "../../assets/logo.png";
// Assuming MainMenu is a separate component
import MainMenu from "../menu/MainMenu";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "../../redux/slices/AuthSlice";

// Navigate import
import { useNavigate } from "react-router-dom";

import ChangeThemeMode from "../settings/Theme/ChangeThemeMode";

const StyledSidebarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  backgroundColor: "none", // Adjust background color as needed
  color: "primary", // Adjust text color as needed
  padding: "1rem 0",
  position: "sticky",
  top: 0,
  left: 0,
  overflowY: "auto", // Add overflow scroll for long content
});

const StyledLogo = styled(Box)({
  width: "100%",
  height: "20vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10%",
});

const StyledProfileDetails = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0.5rem",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(71, 69, 68, 0.508)",
  },
});



const apiUrl = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import LoginModal from "../../Modals/LoginModal";
import RegisterModal from "../../Modals/RegisterModal";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state);

  const logout = async () => {
    try {
      await axios.get(`${apiUrl}/api/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      localStorage.clear();
      dispatch(setLogin(false));
      dispatch(setUser({}));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSidebarContainer>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <StyledLogo>
            <img
              src={logoImg}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </StyledLogo>
        </Toolbar>
      </AppBar>

      <MainMenu />

      {authentication.isLogin ? (
        <StyledProfileDetails button>
          <ListItemAvatar>
            <Avatar src={authentication?.user?.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={`${authentication.user.name} ${authentication.user.surname}`}
            primaryTypographyProps={{ color: "primary" }}
            secondary={`@${authentication.user.username}`}
            secondaryTypographyProps={{ fontSize: "16px", color: "primary" }}
          />
        </StyledProfileDetails>
      ) : (
       <Box>
         <LoginModal />
        <RegisterModal />
       </Box>
      )}
      <Box>
        <ChangeThemeMode />
        {authentication.isLogin && (
          <Button onClick={logout}>
            <PowerSettingsNewIcon />
          </Button>
        )}
      </Box>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
