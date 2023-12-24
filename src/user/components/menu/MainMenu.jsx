import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./scss/main-menu.scss"
import { useNavigate } from 'react-router-dom';
const Menu = () => {
  const navigate=useNavigate()
  return (
    <div id="main-menu-container">
        <List sx={{width:'100%',display:"flex",flexDirection:"column",gap:"30px"}}>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Anasayfa" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate("/best")}>
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Enler" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate("/favorite")}>
              <ListItemIcon>
                <FavoriteBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Favoriler" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate("/profile")}>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Profilim" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate("/settings")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Ayarlar" />
            </ListItemButton>
          </ListItem> 
       </List>

       <button id='new-idea'>Yeni</button>
    </div>
  )
}

export default Menu