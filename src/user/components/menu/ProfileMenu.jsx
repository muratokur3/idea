/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './scss/profile-menu.scss'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
const ProfileMenu = ({user}) => {
  const navigate=useNavigate();
  const authentication = useSelector((state) => state.authentication);
  return (
    <div id='profile-menu-container'>
          <List
           sx={{width:'100%',display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
          <ListItem >
            <ListItemButton onClick={()=>navigate(`/profile/${user.username}`)}>
              <ListItemText primary="Gönderiler" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={()=>navigate("like")}>
              <ListItemText primary="Beğenilen" />
            </ListItemButton>
          </ListItem>

          <ListItem >
            <ListItemButton  onClick={()=>navigate("detail")}>
              <ListItemText primary="Hakkında" />
            </ListItemButton>
          </ListItem>

          <ListItem >
            <ListItemButton  onClick={()=>navigate("project")}>
              <ListItemText primary="Projeler" />
            </ListItemButton>
          </ListItem>

       </List>
       
   
     
       <Button variant="contained" sx={{border:".5px solid gray", background:"none", color: "white", width: "120px",
        height: "30px", fontSize: ".8rem",marginTop:"20px"}}>
          {user.username===authentication.user.username ?"Düzenle":"Takip"}</Button>
    </div>
  )
}

export default ProfileMenu