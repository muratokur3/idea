import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNewPostPage } from "../../redux/slices/UiSlice";
import "./scss/main-menu.scss";
const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const username = useSelector((state) => state.authentication.user.username);
  const location = useLocation();
  return (
    <div id="main-menu-container">
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ListItem disablePadding className={location.pathname === "/" ? "active" : ""}>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Anasayfa" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          className={location.pathname === "/explore" ? "active" : ""}
        >
          <ListItemButton onClick={() => navigate("/explore")}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Keşfet" />
          </ListItemButton>
        </ListItem>

        {isLogin && (
          <>
            <ListItem disablePadding className={location.pathname === "/favorite" ? "active" : ""}>
              <ListItemButton onClick={() => navigate("/favorite")}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Favoriler" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className={location.pathname === `/${username}` ? "active" : ""}>
              <ListItemButton onClick={() => navigate(`/${username}`)}>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary="Profilim" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className={location.pathname === "/settings" ? "active" : ""}>
              <ListItemButton onClick={() => navigate("/settings")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ayarlar" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {isLogin && (
        <Button
          id="new-idea"
          variant="outlined"
          onClick={() => dispatch(setNewPostPage(true))}
        >
          Yeni
        </Button>
      )}
    </div>
  );
};

export default Menu;
