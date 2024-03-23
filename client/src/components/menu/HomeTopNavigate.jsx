import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeTopNavigate = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("home");
  const username = useSelector(
    (state) => state.session && state.session.user.username
  );
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.user.isLoggedIn
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: "0", left: "0" }}
      value={value}
      onChange={handleChange}
    >
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
      {isLoggedIn && (
        <BottomNavigationAction
          onClick={() => navigate(`/${username}`)}
          value="profile"
          icon={<AccountCircleIcon />}
        />
      )}
    </BottomNavigation>
  );
};
export default HomeTopNavigate;
