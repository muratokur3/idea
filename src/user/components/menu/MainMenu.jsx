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
import SearchIcon from '@mui/icons-material/Search';
import "./scss/main-menu.scss"
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNewIdeaPage } from '../../../store/UiSlice';
const Menu = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  return (
    <div id="main-menu-container">
        <List sx={{width:'100%',display:"flex",flexDirection:"column",gap:"20px"}}>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Anasayfa" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate("/explore")}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Keşfet" />
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
       <Button id="new-idea" variant="outlined" onClick={()=>dispatch(setNewIdeaPage(true))}>Yeni</Button>
    </div>
  )
}

export default Menu