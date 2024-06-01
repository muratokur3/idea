import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar";
const MobileDrawerMenu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          position: "absolute",
          top: "20%",
          right: "5%",
          cursor: "pointer",
        }}
      >
        <MenuIcon />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Sidebar />
      </Drawer>
    </Box>
  );
};
export default MobileDrawerMenu;
