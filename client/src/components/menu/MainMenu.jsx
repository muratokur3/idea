import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation, useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import "./scss/main-menu.scss";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import NewPostPage from "../../Modals/NewPostPage";
import { pink, red } from '@mui/material/colors';
const Menu = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const username = useSelector((state) => state.authentication.user.username);
  const location = useLocation();
  const locPath = location.pathname;
  const [widthThreshold, setWidthThreshold] = useState(window.innerWidth < 1235);
  const theme = useTheme();
  useEffect(() => {
    const handleResize = () => {
      setWidthThreshold(window.innerWidth < 1235);
    };

    // Event listener ekleyin
    window.addEventListener("resize", handleResize);

    // Temizlik işlemi: componentWillUnmount gibi
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 
  return (
    <div id="main-menu-container">
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <ListItem disablePadding className={locPath === "/" ? "active" : ""} sx={{width: widthThreshold ? "60px" : "95%"}} >
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Anasayfa"
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block"}}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          className={locPath === "/explore" ? "active" : ""}
          sx={{width: widthThreshold ? "60px" : "95%"}}
        >
          <ListItemButton onClick={() => navigate("/explore")}>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Keşfet" 
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block" }}/>
          </ListItemButton>
        </ListItem>

        {isLogin && (
          <>
            <ListItem
              disablePadding
              className={locPath === "/favorite" ? "active" : ""}
              sx={{width: widthThreshold ? "60px" : "95%"}}
            >
              <ListItemButton onClick={() => navigate("/favorite")}>
                <ListItemIcon>
                  <StarBorderIcon/>
                </ListItemIcon>
                <ListItemText primary="Favorile"
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === "/MyLikes" ? "active" : ""}
              sx={{width: widthThreshold ? "60px" : "95%"}}
            >
              <ListItemButton onClick={() => navigate("/MyLikes")}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Beğeni" 
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === `/${username}` ? "active" : ""}
              sx={{width: widthThreshold ? "60px" : "95%"}}
            >
              <ListItemButton onClick={() => navigate(`/${username}`)}>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary="Profilim" 
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === "/settings" ? "active" : ""}
              sx={{width: widthThreshold ? "60px" : "95%"}}
            >
              <ListItemButton onClick={() => navigate("/settings")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ayarlar" 
              primaryTypographyProps={{ color: theme.palette.primary.main }}
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {isLogin && (
        <NewPostPage widthThreshold={widthThreshold}/>
      )}
    </div>
  );
};

export default Menu;
