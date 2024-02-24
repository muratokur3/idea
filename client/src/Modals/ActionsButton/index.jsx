import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
const ActionsButton = ({ actions }) => {
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
        transitioncomponent={Fade}
        PaperProps={{
          style: {
            backgroundColor: "black",
            color: "white",
            padding: "5px",
          },
        }}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={action?.onClick}>
            {action?.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionsButton;
ActionsButton.propTypes = {
  actions: PropTypes.array,
};
