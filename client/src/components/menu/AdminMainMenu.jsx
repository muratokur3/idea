import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import TagIcon from '@mui/icons-material/Tag';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import './scss/admin-main-menu.scss'
const AdminMainMenu = () => {
  return (
    <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ListItem disablePadding className={location.pathname === "/" ? "active" : ""}>
          <ListItemButton >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          className={location.pathname === "/explore" ? "active" : ""}
        >
          <ListItemButton >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Kullanıcılar" />
          </ListItemButton>
        </ListItem>

       
          <>
            <ListItem disablePadding className={location.pathname === "/favorite" ? "active" : ""}>
              <ListItemButton>
                <ListItemIcon>
                  < DynamicFeedIcon/>
                </ListItemIcon>
                <ListItemText primary="Postlar" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
            {/* className={location.pathname === `/${username}` ? "active" : ""} */}
              <ListItemButton>
                <ListItemIcon>
                  < AccountTreeIcon/>
                </ListItemIcon>
                <ListItemText primary="Projeler" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className={location.pathname === "/settings" ? "active" : ""}>
              <ListItemButton>
                <ListItemIcon>
                  < TagIcon/>
                </ListItemIcon>
                <ListItemText primary="Hashtagler" />
              </ListItemButton>
            </ListItem>
          </>
      </List>
  )
}

export default AdminMainMenu