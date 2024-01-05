/* eslint-disable react/prop-types */
import './scss/user-detail.scss'
import backgrounimage from "../../../assets/backgroundimage.jpg";
import { Avatar, Box, Typography } from '@mui/material';
import ProfileMenu from '../menu/ProfileMenu';
const UserDetail = ({user}) => {

  return (
    <div id='user-detail-container'>
        <img src={backgrounimage} className='background-image'/>
        <div className='user-detail'>
           
         <Box display="flex" flexDirection={"column"} padding={2} alignItems="center" width={"100%" }>
          <Avatar
          src="../../../src/assets/muratokur.jpeg"
          sx={{ width: 150, height: 150 , margin: "-90px 0 0 0", border: "5px solid black"}}
        /> <Typography>
          {user.name + " " + user.surname}
        </Typography>
        <Typography sx={{color: 'gray', fontSize:".8rem" }}>
        @{user.username}
      </Typography>
      </Box>
     <ProfileMenu username={user.username}/>
       </div>
    </div>
  )
}

export default UserDetail