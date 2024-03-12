import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import Login from "../Auth/Login";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
const LoginModal = () => {
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
            }} endIcon={<LoginIcon />}
        >
            Giriş Yap
            
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
            height: "40vh",
          },
        }}
      >
       
        <DialogTitle id="login-dialog-title" color="primary" sx={{ textAlign: "center" }}>
          Giriş Yap
        </DialogTitle>
        <DialogContent
         sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Login />
        </DialogContent>
         <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default LoginModal;
