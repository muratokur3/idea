import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";
import "./explore.scss";
const Explore = () => {

  return (
    <div id="explore-container">
      <div id="search-box">
        <Paper
          component="form"
          sx={{
            background: "none",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>

          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Kişi konu veya hashtag ara"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Outlet />
    </div>
  );
};

export default Explore;
