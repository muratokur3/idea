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
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";

import { useTheme } from "@mui/material/styles";
import MainMenu from "../menu/MainMenu";
import { useSelector } from "react-redux";
import ChangeThemeMode from "../settings/Theme/ChangeThemeMode";
import { sessionService } from "redux-react-session";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Badge from "@mui/material/Badge";
import { useMediaQuery } from "@mui/material";
import Modal from "../../Modals";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
const webApiUrl = import.meta.env.VITE_API_BASE_URL;

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100vh",
  backgroundColor: "none",
  color: "primary",
  position: "sticky",
  top: 0,
  left: 0,
});

const Logo = styled(Box)({
  width: "100%",
  height: "10vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1234px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );
  const loginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios("auth/logout");
      if (response.status === 200) {
        sessionService.invalidateSession();
        window.localStorage.clear();
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          gap: "10%",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <AppBar position="static" color="transparent" elevation={0} >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Logo onClick={() => navigate("/")}>
              <img
                src={theme.palette.mode === "dark" ? logoDark : logoLight}
                alt="Logo"
                style={{
                  width: "15vh",
                  height: "15vh",
                  marginBottom:"5rem"
                }}
              />
            </Logo>
          </Toolbar>
        </AppBar>

        <MainMenu />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: !isMobile && ".8rem",
        }}
      >
        {isLoggedIn ? (
          <Details
            onClick={() => navigate(`/${loginedUser?.username}`)}
            sx={{
              padding: "1rem",
            }}
          >
            <ListItemAvatar sx={{ display: "flex", justifyContent: "center" }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={webApiUrl + loginedUser?.avatar}
                  sx={{ width: "5vh", height: "5vh" }}
                />
              </StyledBadge>
            </ListItemAvatar>

            {!isTablet && (
              <ListItemText
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                primary={`${loginedUser?.name} ${loginedUser?.surname}`}
                primaryTypographyProps={{ color: "primary" }}
                secondary={`@${loginedUser?.username}`}
              />
            )}
          </Details>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Modal
              buttonText="giriş yap"
              component={<Login />}
              icon={<LoginIcon />}
            />
            <Modal
              buttonText="kayıt ol"
              component={<Register />}
              icon={<AppRegistrationIcon />}
            />
          </Box>
        )}
        {isLoggedIn && (
          <Button onClick={handleLogout}>
            {!isTablet && "Çıkış yap"} <PowerSettingsNewIcon />
          </Button>
        )}
        <ChangeThemeMode />
      </Box>
    </Container>
  );
};

export default Sidebar;
