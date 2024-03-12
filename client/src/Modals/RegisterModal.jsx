import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Register from "../Auth/Register";
import { useState } from "react";
const RegisterModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "100%",
          borderRadius: "30px",
          backgroundColor: "none",
          "&:hover": {
            borderColor: "white",
          },
        }}
        endIcon={<AppRegistrationIcon />}
      >
        Kayıt Ol
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        maxWidth="xl"
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            width: "75vw",
            height: "auto",
            padding: "0 5% ",
          },
        }}
      >
       
        <DialogTitle id="login-dialog-title" color="primary" sx={{ textAlign: "center" }}>
          Kayıt Ol
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Register />
        </DialogContent>
         <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default RegisterModal;
