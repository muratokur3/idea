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
const Modal = ({buttonText,component,icon}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "100%",
          borderRadius: "30px",
        }}
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
       
      >
        <DialogTitle
          id="login-dialog-title"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          {buttonText}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         {React.cloneElement(component, {modalAction:{handleClose}})}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
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
