/* eslint-disable react/prop-types */
import './scss/user-detail.scss'
import backgroundimage from "../../assets/backgroundimage.jpg";
import { Avatar, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
const UserDetail = ({user}) => {
  const authentication = useSelector((state) => state.authentication);

  return (
    <div id='user-detail-container'>
        <img src={backgroundimage} className='background-image'/>
        <div className='user-detail'>
           
         <Box display="flex" flexDirection={"column"} padding={2}  alignItems="center" width={"100%" }>
          <Avatar
          src="../../../src/assets/muratokur.jpeg"
          sx={{ width: 150, height: 150 , margin: "-90px 0 0 0", border: "5px solid black"}}
        /> <Typography>
          {user.name + " " + user.surname}
        </Typography>
        <Typography sx={{color: 'gray', fontSize:".8rem" }}>
        @{user.username}
      </Typography>
      <Button variant="contained" sx={{border:".5px solid gray", background:"none", color: "white", width: "120px",
        height: "30px", fontSize: ".8rem", marginTop:"10px"}}>
          {user.username===authentication.user.username ?"Düzenle":"Takip"}</Button>
      </Box>

    
       </div>
    </div>
  )
}

export default UserDetail