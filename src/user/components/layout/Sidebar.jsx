import MainMenu from "../menu/MainMenu"
import "./scss/sidebar.scss"
import logoImg from "../../../assets/logo.png"
import Avatar from '@mui/material/Avatar';
const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <div id="logo">
        <img src={logoImg}/>
      </div>
      <MainMenu/>
      <div id="menu-profile-detail">
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
      </div>
    </div>
  )
}

export default Sidebar