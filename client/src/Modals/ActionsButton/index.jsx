import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
 
const ActionsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
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
            <MenuItem >Merhaba</MenuItem>
          </Menu>
    </div>
  )
}

export default ActionsButton