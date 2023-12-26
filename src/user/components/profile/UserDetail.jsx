import './scss/user-detail.scss'
import backgrounimage from "../../../assets/backgroundimage.jpg";
import { Avatar, Box, Typography } from '@mui/material';
import ProfileMenu from '../menu/ProfileMenu';
const UserDetail = () => {
  return (
    <div id='user-detail-container'>
        <img src={backgrounimage} className='background-image'/>
        <div className='user-detail'>
           
         <Box display="flex" flexDirection={"column"} padding={2} alignItems="center" width={"100%" }>
          <Avatar
          src="../../../src/assets/muratokur.jpeg"
          sx={{ width: 150, height: 150 , margin: "-90px 0 0 0", border: "5px solid black"}}
        /> <Typography>
          {"Murat OKUR"}
        </Typography>
        <Typography sx={{color: 'gray', fontSize:".8rem" }}>
        @{"muratokur3"}
      </Typography>
      </Box>
     <ProfileMenu/>
       </div>
    </div>
  )
}

export default UserDetail