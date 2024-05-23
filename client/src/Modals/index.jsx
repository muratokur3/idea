import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
const Modal = ({ buttonText, component, icon }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Box>
      <Button
        variant="text"
        color="primary"
        onClick={handleOpen}
        endIcon={icon}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        maxWidth="md"
        fullWidth={true}
        sx={{
          opacity: ".994",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#000000dc",
          }}
        >
          <DialogTitle
            id="login-dialog-title"
            color="primary"
            sx={{ textAlign: "center", backgroundColor: "none" }}
          >
            {buttonText}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "none",
            }}
          >
            {React.cloneElement(component, { modalAction: { handleClose } })}
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: "none",
            }}
          >
            <Button onClick={handleClose}>İptal</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
export default Modal;
Modal.propTypes = {
  buttonText: PropTypes.string,
  component: PropTypes.element,
  icon: PropTypes.element,
};
