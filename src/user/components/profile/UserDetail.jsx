import './scss/user-detail.scss'
import backgrounimage from "../../../assets/backgroundimage.jpg";
import { Avatar, Box, Button, Typography } from '@mui/material';
const UserDetail = () => {
  return (
    <div id='user-detail-container'>
        <img src={backgrounimage} className='background-image'/>
        <div className='user-detail'>
            <Avatar
          src="../../../src/assets/muratokur.jpeg"
          sx={{ width: 200, height: 200 , margin: "-100px 0 0 0", border: "5px solid black"}}
        />
         <Box display="flex" flexDirection={"column"} padding={2} alignItems="center" width={"20%" }>
          <Typography>
          {"Murat OKUR"}
        </Typography>
        <Typography sx={{color: 'gray', fontSize:".8rem" }}>
        @{"muratokur3"}
      </Typography>
      </Box>
     
     <Button variant="contained" sx={{border:".5px solid gray", background:"none", color: "white", width: "120px", height: "30px", fontSize: ".8rem",marginTop:"20px"}}>Takip</Button>
       </div>
    </div>
  )
}

export default UserDetail