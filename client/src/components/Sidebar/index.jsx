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
import { setAuthPage } from "../../redux/slices/UiSlice";
import { setLogin, setUser } from "../../redux/slices/AuthSlice";

// Navigate import
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";

import ChangeThemeMode from "../settings/Theme/ChangeThemeMode";

const StyledSidebarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  backgroundColor: "none", // Adjust background color as needed
  color: "white", // Adjust text color as needed
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

const StyledLoginButton = styled(Button)({
  width: "100%",
  borderRadius: "60px",
  color: "primary",
});

const apiUrl = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
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
        <StyledLoginButton
          color="primary"
          onClick={() => dispatch(setAuthPage(true))}
          endIcon={<LoginIcon />}
        >
          Giriş Yap
        </StyledLoginButton>
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
// import MainMenu from "../menu/MainMenu";
// import logoImg from "../../assets/logo.png";
// import Avatar from "@mui/material/Avatar";
// import LoginIcon from "@mui/icons-material/Login";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button, Fade, IconButton, Menu, MenuItem } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setAuthPage } from "../../redux/slices/UiSlice";
// import "./sidebar.scss";
// import axios from "axios";
// import { setLogin, setUser } from "../../redux/slices/AuthSlice";
// import ChangeThemeMode from "../settings/Theme/ChangeThemeMode";
// const Sidebar = () => {
// const apiUrl = import.meta.env.VITE_API_BASE_URL;
// const navigate=useNavigate();
//   const authentication = useSelector((state) => state.authentication);
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const logout = async() => {
//       try {
//         await axios.get(`${apiUrl}/api/auth/logout`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         });
//         localStorage.clear();
//         dispatch(setLogin(false));
//         dispatch(setUser({}));
//         navigate("/");

//       } catch (error) {
//         console.log(error);
//       }

//     setAnchorEl(null);
//   }

//   return (
//     <div id="sidebar-container">
//       <div id="logo">
//         <img src={logoImg} />
//       </div>
//       <MainMenu />

//       {authentication.isLogin ? (
//         <div id="menu-profile-detail">
//           <Avatar
//             alt="Remy Sharp"
//             src={authentication?.user?.avatar}
//             sx={{ width: 45, height: 45 }}
//           />
//           <div>
//             <h4>{`${authentication.user.name} ${authentication.user.surname}`}</h4>
//             <h6>@{authentication.user.username}</h6>
//           </div>

//           <IconButton
//             aria-label="more"
//             id="long-button"
//             aria-controls={open ? "long-menu" : undefined}
//             aria-expanded={open ? "true" : undefined}
//             aria-haspopup="true"
//             onClick={handleClick}
//           >
//             <MoreVertIcon fontSize="small" />
//           </IconButton>
//           <Menu
//             id="fade-menu"
//             MenuListProps={{
//               "aria-labelledby": "fade-button",
//             }}
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             transitioncomponent={Fade}
//             PaperProps={{
//               style: {
//                 backgroundColor: 'black',
//                 color: 'white',
//                 padding:"5px",
//               },
//             }}
//           >
//             <MenuItem onClick={()=>navigate(`/${authentication.user.username}`)}>Profile Git</MenuItem>
//             <MenuItem onClick={logout}>Çıkış Yap</MenuItem>
//           </Menu>
//         </div>
//       ) : (
//         <Button
//           onClick={() => dispatch(setAuthPage(true))}
//           endIcon={<LoginIcon />}
//           id="login-button"
//           variant="text"
//         >
//           Giriş Yap
//         </Button>
//       )}
//      <ChangeThemeMode/>
//     </div>
//   );
// };

// export default Sidebar;
