import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './scss/profile-menu.scss'
import { useNavigate } from 'react-router-dom';
const ProfileMenu = () => {
  const navigate=useNavigate();
  return (
    <div id='profile-menu-container'>
          <List
           sx={{width:'100%',display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
          <ListItem >
            <ListItemButton onClick={()=>navigate("/profile")}>
              <ListItemText primary="Gönderiler" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={()=>navigate("/profile/like")}>
              <ListItemText primary="Beğenilen" />
            </ListItemButton>
          </ListItem>

          <ListItem >
            <ListItemButton  onClick={()=>navigate("/profile/detail")}>
              <ListItemText primary="Hakkında" />
            </ListItemButton>
          </ListItem>

          <ListItem >
            <ListItemButton  onClick={()=>navigate("/profile/project")}>
              <ListItemText primary="Projeler" />
            </ListItemButton>
          </ListItem>

       </List>
      
    </div>
  )
}

export default ProfileMenu