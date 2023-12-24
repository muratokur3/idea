import MainMenu from "../menu/MainMenu"
import "./scss/sidebar.scss"
import logoImg from "../../../assets/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <div id="logo">
        <img src={logoImg}/>
      </div>
      <MainMenu/>
      <div id="menu-profile-detail">
<AccountCircleIcon />
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