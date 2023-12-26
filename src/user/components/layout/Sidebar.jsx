import MainMenu from "../menu/MainMenu"
import "./scss/sidebar.scss"
import logoImg from "../../../assets/logo.png"
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from "@mui/material";
const Sidebar = () => {

  const userAuthurization = false;
  return (
    <div id="sidebar-container">
      <div id="logo">
        <img src={logoImg}/>
      </div>
      <MainMenu/>

      {userAuthurization ? (<div id="menu-profile-detail">
       
        
      <Avatar
        alt="Remy Sharp"
        src="src/assets/muratokur.jpeg"
        sx={{ width: 45, height: 45 }}
      />
<div>
  <h4>Murat OKUR</h4>
  <h6>@muratokur3</h6>
</div>
<span>...</span>
      </div>)
:(

<Button endIcon={<LoginIcon/>} id="login-button" variant="text">Giriş Yap</Button>)}
    </div>
  )
}

export default Sidebar