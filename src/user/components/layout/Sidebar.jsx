import MainMenu from "../menu/MainMenu";
import "./scss/sidebar.scss";
import logoImg from "../../../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../../store/UiSlice";
import { useState } from "react";
import { setLogin, setUser } from "../../../store/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate=useNavigate();
  const authentication = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const lagout = () => {
    localStorage.clear();
    dispatch(setLogin(false));
    dispatch(setUser({}));
    setAnchorEl(null);
  }
  return (
    <div id="sidebar-container">
      <div id="logo">
        <img src={logoImg} />
      </div>
      <MainMenu />

      {authentication.isLogin ? (
        <div id="menu-profile-detail">
          <Avatar
            alt="Remy Sharp"
            src="src/assets/muratokur.jpeg"
            sx={{ width: 45, height: 45 }}
          />
          <div>
            <h4>{`${authentication.user.name} ${authentication.user.surname}`}</h4>
            <h6>@{authentication.user.username}</h6>
          </div>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            PaperProps={{
              style: {
                backgroundColor: 'black', 
                color: 'white',
                padding:"5px",
              }, 
            }}
          >
            <MenuItem onClick={()=>navigate("/profile/detail")}>Profile Git</MenuItem>
            <MenuItem onClick={lagout}>Çıkış Yap</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button
          onClick={() => dispatch(setLoginPage(true))}
          endIcon={<LoginIcon />}
          id="login-button"
          variant="text"
        >
          Giriş Yap
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
