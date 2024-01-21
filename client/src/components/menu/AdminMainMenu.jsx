import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import TagIcon from "@mui/icons-material/Tag";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "./scss/admin-main-menu.scss";
import { useLocation, useNavigate } from "react-router-dom";
const AdminMainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locPath = location.pathname;
  return (
    <List
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ListItem
        disablePadding
        className={locPath === "/admin" ? "active" : ""}
      >
        <ListItemButton onClick={() => navigate("/admin")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>

      <ListItem
        disablePadding
        className={locPath === "/admin/users" ? "active" : ""}
      >
        <ListItemButton onClick={() => navigate("/admin/users")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Kullanıcılar" />
        </ListItemButton>
      </ListItem>

      <ListItem
        disablePadding
        className={locPath === "/admin/posts" ? "active" : ""}
      >
        <ListItemButton onClick={() => navigate("/admin/posts")}>
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary="Postlar" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding
        className={locPath === "/admin/projects" ? "active" : ""}>
        <ListItemButton onClick={() => navigate("/admin/projects")}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Projeler" />
        </ListItemButton>
      </ListItem>

      <ListItem
        disablePadding
        className={locPath === "/admin/hashtags" ? "active" : ""}
      >
        <ListItemButton onClick={() => navigate("/admin/hashtags")}>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="Hashtagler" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AdminMainMenu;
