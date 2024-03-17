import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
const LoginModal = ({buttonText,component,icon}) => {
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
        maxWidth="xl"
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            width: "90vw",
            minHeight: "70vh",
          },
        }}
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
          {component}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default LoginModal;
