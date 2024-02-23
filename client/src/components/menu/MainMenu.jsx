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
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNewPostPage } from "../../redux/slices/UiSlice";
import "./scss/main-menu.scss";
import { useEffect, useState } from "react";
const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const username = useSelector((state) => state.authentication.user.username);
  const location = useLocation();
  const locPath = location.pathname;
  const [widthThreshold, setWidthThreshold] = useState(window.innerWidth < 1235);

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
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Keşfet" 
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
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Favorilerim"
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === "/likeMe" ? "active" : ""}
              sx={{width: widthThreshold ? "60px" : "95%"}}
            >
              <ListItemButton onClick={() => navigate("/likeMe")}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Beğeni" 
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
              sx={{ display: widthThreshold ? "none" : "block" }}/>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {isLogin && (
        <Button
          id="new-idea"
          variant="outlined"
          sx={{ width: widthThreshold ? "15px" : "80%" }}
          onClick={() => dispatch(setNewPostPage(true))}
        >
         {widthThreshold? "+":"yeni"}
        </Button>
      )}
    </div>
  );
};

export default Menu;
