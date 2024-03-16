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
import { useTheme } from "@mui/material/styles";
import MainMenu from "../menu/MainMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangeThemeMode from "../settings/Theme/ChangeThemeMode";
import { sessionService } from "redux-react-session";
import axios from "../../../axiosConfig";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minWidth: "175px",
  height: "100vh",
  backgroundColor: "none", // Adjust background color as needed
  color: "primary", // Adjust text color as needed
  padding: "0 1rem",
  position: "sticky",
  top: 0,
  left: 0,
  overflowY: "auto", // Add overflow scroll for long content
});

const Logo = styled(Box)({
  width: "100%",
  height: "10vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // padding: "10%",
});

const Details = styled(Box)({

  width: "100%",
  padding: "0 1rem",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(71, 69, 68, 0.508)",
  },
});

import LoginModal from "../../Modals/LoginModal";
import RegisterModal from "../../Modals/RegisterModal";
const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isLoggedIn = useSelector(state => state.session && state.session.authenticated);
  const loginedUser = useSelector((state) => state.session && state.session.user);

  const handleLogout = async () => {
    try {
    axios.get(`${apiUrl}/api/auth/logout`);
    await sessionService.deleteSession();
      await sessionService.deleteUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Logo>
            <img
              src={logoImg}
              alt="Logo"
              style={{ width: "40px", height: "40px",background: `${
                theme.palette.mode === "light" ? "grey" : "none"
              }`, }}
            />
          </Logo>
        </Toolbar>
      </AppBar>

      <MainMenu />
      {isLoggedIn ? (
        <Details>
          <ListItemAvatar sx={{paddingLeft:"10%"}}>
            <Avatar src={loginedUser.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={`${loginedUser.name} ${loginedUser.surname}`}
            primaryTypographyProps={{ color: "primary" }}
            secondary={`@${loginedUser.username}`}
            secondaryTypographyProps={{ fontSize: "16px", color: "primary" }}
          />
        </Details>
      ) : (
       <Box>
         <LoginModal />
        <RegisterModal />
       </Box>
      )}
      <Box>
        <ChangeThemeMode />
        {isLoggedIn && (
          <Button onClick={handleLogout}>
            <PowerSettingsNewIcon />
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Sidebar;
