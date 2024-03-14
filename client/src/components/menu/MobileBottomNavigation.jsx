import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const  MobileBottomNavigation =()=> {
  const navigate=useNavigate();
  const [value, setValue] = React.useState('home');
  const username = useSelector((state) => state.authentication.user.username);
  const isLogin = useSelector((state) => state.authentication.user.isLogin);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: "100%", position:"fixed",bottom:"0",left:"0" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
         onClick={() => navigate("/")}
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
         onClick={() => navigate("/explore")}
        value="explore"
        icon={<SearchIcon />}
        />
     {isLogin&& <BottomNavigationAction
  onClick={()=>navigate(`/${username}`)}
        value="profile"
        icon={<AccountCircleIcon />}
      />}
    </BottomNavigation>
  );
}
export default MobileBottomNavigation;