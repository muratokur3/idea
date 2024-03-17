import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useState } from "react";
import NewProject from "../components/profile/project/NewProject";
const RegisterModal = () => {
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
        endIcon={<AppRegistrationIcon />}
      >
        YENİ PROJE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        maxWidth="xl"
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            width: "95vw",
            height: "auto",
          },
        }}
      >
        <DialogTitle
          id="login-dialog-title"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          Yeni Proje
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewProject />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default RegisterModal;
